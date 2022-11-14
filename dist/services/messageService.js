"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("services");
const wsResFactory_1 = __importDefault(require("../api/ws/utils/wsResFactory"));
const chatProviders_1 = __importDefault(require("./utils/chatProviders"));
const wsController_1 = __importDefault(require("./utils/wsController"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const databaseConnection_1 = require("databaseProviders/lib/database/databaseConnection");
class MessageService {
    static sendMessage(fromUserId, chatRoomId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // 1 /-----------Create message--------------
            const chatProviders = yield (0, chatProviders_1.default)();
            const chatRoom = yield chatProviders.chatRoomProvider.findOne({
                _id: chatRoomId,
            });
            if (!chatRoom)
                throw new services_1.HttpError(404, 'Chat room is not found');
            chatRoom.users = chatRoom.users;
            if (!chatRoom.users.includes(fromUserId))
                throw new services_1.HttpError(403, 'Access denied');
            if (!data.message && !data.attachedData)
                throw new services_1.HttpError(403, 'Message is empty');
            //Validation
            const message = data.message;
            const attachedData = data.attachedData;
            if (!message && attachedData) {
                if (attachedData.files.length == 0 || attachedData.messages.length == 0) {
                    throw new services_1.HttpError(403, 'Attached files is Empty');
                }
            }
            const dataForCreate = {
                chatRoom: chatRoomId,
                message: data.message,
                refrencedTo: data.refrencedTo,
                attachedData: data.attachedData,
                readByUsers: [fromUserId],
                status: 'sent',
                createdBy: fromUserId,
                updatedBy: fromUserId,
            };
            const createdMessage = yield chatProviders.messageProvider.create(dataForCreate);
            if (!createdMessage)
                throw new services_1.HttpError(520);
            // 2 /-----------Update chatRoom--------------
            let unreadMessagesInfo = chatRoom.unreadMessagesInfo;
            //increment uread Messages
            for (const info of unreadMessagesInfo) {
                info.user = info.user;
                if (info.user == fromUserId)
                    continue;
                info.unreadMessagesCount++;
            }
            yield chatProviders.chatRoomProvider.updateOne({
                _id: chatRoomId,
            }, {
                $inc: { messageCounter: 1 },
                unreadMessagesInfo,
            });
            // 3 /-----------WS notifications--------------
            const response = new wsResFactory_1.default('messageRecieved');
            response.data = {
                messageId: createdMessage.id,
            };
            const resJSON = response.toJSON();
            const database = yield (0, databaseConnection_1.databaseInit)();
            for (const userId of chatRoom.users) {
                if (userId == fromUserId)
                    continue;
                const connection = wsController_1.default.get(userId);
                if (!connection) {
                    const FromUser = yield chatProviders.userProvider.findOne({ _id: fromUserId }, { fullName: true });
                    if (FromUser) {
                        new services_1.FirebaseService({ database }, firebase_admin_1.default).sendNotificationByUserId(userId, {
                            notification: {
                                title: chatRoom.name + ': ' + FromUser.fullName
                                    ? FromUser.fullName
                                    : FromUser.email.split('@')[0],
                                body: data.message,
                            },
                        });
                    }
                    continue;
                }
                connection.send(resJSON);
            }
            return createdMessage;
        });
    }
    static getMessage(fromUserId, messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            const chatProviders = yield (0, chatProviders_1.default)();
            // 1 /-----------Find message--------------
            const message = yield chatProviders.messageProvider.findOne({
                _id: messageId,
            });
            if (!message)
                throw new services_1.HttpError(404, 'Message not found');
            const chatRoomOfMessage = yield chatProviders.chatRoomProvider.findOne({
                _id: message.chatRoom,
            });
            if (!chatRoomOfMessage)
                throw new services_1.HttpError(520);
            chatRoomOfMessage.users = chatRoomOfMessage.users;
            if (!chatRoomOfMessage.users.includes(fromUserId))
                throw new services_1.HttpError(403, 'Access denied');
            // 2 /-----------Update message status--------------
            yield this.receiveMessage(fromUserId, message);
            const updatedMessage = yield chatProviders.messageProvider.findOne({
                _id: messageId,
            });
            if (!updatedMessage)
                throw new services_1.HttpError(520);
            return updatedMessage;
        });
    }
    static getMessagesByChatRoom(fromUserId, chatRoomId, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const chatProviders = yield (0, chatProviders_1.default)();
            const chatRoom = yield chatProviders.chatRoomProvider.findOne({
                _id: chatRoomId,
            });
            if (!chatRoom)
                throw new services_1.HttpError(404, 'Chat room is not found');
            chatRoom.users = chatRoom.users;
            if (!chatRoom.users.includes(fromUserId))
                throw new services_1.HttpError(403, 'Access denied');
            //validate query
            if (!query.limit)
                query.limit = 100;
            if (!query.offset)
                query.offset = 0;
            if (query.onlyUnreadMessages === undefined)
                query.onlyUnreadMessages = true;
            let messagesSearchBy = {
                chatRoom: chatRoomId,
            };
            if (query.onlyUnreadMessages) {
                messagesSearchBy.readByUsers = { $nin: [fromUserId] };
            }
            const messages = yield chatProviders.messageProvider.find(messagesSearchBy, {}, null, {
                limit: Number(query.limit),
                skip: Number(query.offset),
            });
            // 2 /-----------Update messages status--------------
            const messagesIds = messages.map((msg) => {
                return msg.id;
            });
            for (const msg of messages) {
                yield this.receiveMessage(fromUserId, msg);
            }
            const updatedMessages = yield chatProviders.messageProvider.find({
                _id: messagesIds,
            });
            return {
                messages: updatedMessages,
                count: chatRoom.messageCounter,
            };
        });
    }
    static delete(fromUserId, messageIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const chatProviders = yield (0, chatProviders_1.default)();
            if (!messageIds || messageIds.length == 0)
                throw new services_1.HttpError(403, 'Nothing to delete');
            const messages = yield chatProviders.messageProvider.find({
                _id: messageIds,
                createdBy: fromUserId,
            });
            if (messages.length < messageIds.length) {
                throw new services_1.HttpError(404, 'ChatRooms not found');
            }
            for (const msg of messages) {
                const chatRoomId = msg.chatRoom;
                yield chatProviders.chatRoomProvider.updateOne({ _id: chatRoomId }, { $inc: { messageCounter: -1 } });
            }
            const deleteStatus = yield chatProviders.messageProvider.deleteMany({
                _id: messageIds,
            });
            return deleteStatus;
        });
    }
    static receiveMessage(recipientUserId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            message.receivedByUsers = message.receivedByUsers;
            if (message.receivedByUsers.includes(recipientUserId))
                return;
            const chatProviders = yield (0, chatProviders_1.default)();
            yield chatProviders.messageProvider.updateOne({
                _id: message.id,
            }, {
                $push: { receivedByUsers: recipientUserId },
                status: message.status == 'sent' ? 'delivered' : message.status,
            });
        });
    }
}
exports.default = MessageService;
//# sourceMappingURL=messageService.js.map