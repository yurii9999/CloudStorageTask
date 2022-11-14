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
class ChatRoomService {
    static findById(fromUserId, chatRoomId) {
        return __awaiter(this, void 0, void 0, function* () {
            const chatProviders = yield (0, chatProviders_1.default)();
            const chatRoom = yield chatProviders.chatRoomProvider.findOne({ _id: chatRoomId }, {}, { path: "users", populate: undefined, select: "" });
            if (!chatRoom)
                throw new services_1.HttpError(404, 'Chat room not found');
            chatRoom.users = chatRoom.users;
            chatRoom.users = chatRoom.users.map((user) => user.id);
            if (!chatRoom.users.includes(fromUserId))
                throw new services_1.HttpError(403, 'Access denied');
            return chatRoom;
        });
    }
    static list(fromUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const chatProviders = yield (0, chatProviders_1.default)();
            const chatRooms = yield chatProviders.chatRoomProvider.find({
                users: { $in: [fromUserId] },
            }, {}, { path: 'users', populate: undefined, select: '' });
            const count = chatRooms.length;
            return { chatRooms, count };
        });
    }
    static create(chatRoomCreatorId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // 1 /-----------Create chatRoom--------------
            const chatProviders = yield (0, chatProviders_1.default)();
            if (!data.users || data.users.length == 0)
                throw new services_1.HttpError(403, 'Invalid input data');
            data.users = data.users;
            if (!data.users.includes(chatRoomCreatorId))
                data.users.push(chatRoomCreatorId);
            const unreadMessagesInfo = data.users.map((user) => {
                return {
                    user,
                    unreadMessagesCount: 0,
                };
            });
            //check is chatRoom already exists
            if (data.users.length == 2) {
                const existingChatRoom = yield chatProviders.chatRoomProvider.findOne({
                    users: data.users,
                });
                if (existingChatRoom)
                    return existingChatRoom;
            }
            const dataForCreate = Object.assign(Object.assign({}, data), { unreadMessagesInfo, isPrivateConversation: data.users.length > 2 ? false : true, createdBy: chatRoomCreatorId, updatedBy: chatRoomCreatorId });
            const createdChatRoom = yield chatProviders.chatRoomProvider.create(dataForCreate);
            if (!createdChatRoom)
                throw new services_1.HttpError(520);
            const findStatus = yield chatProviders.chatRoomProvider.findOne({ _id: createdChatRoom.id }, {}, { path: 'users', populate: undefined, select: '' });
            if (!findStatus)
                throw new services_1.HttpError(520);
            // 3 /-----------WS notifications--------------
            const response = new wsResFactory_1.default('chatRoomInvitation');
            response.data = {
                chatRoomId: createdChatRoom.id,
                inviterId: chatRoomCreatorId,
            };
            const resJSON = response.toJSON();
            for (const userId of data.users) {
                if (userId == chatRoomCreatorId)
                    continue;
                const connection = wsController_1.default.get(userId);
                if (!connection)
                    continue;
                connection.send(resJSON);
            }
            return findStatus;
        });
    }
    static update(fromUserId, chatRoomId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const chatProviders = yield (0, chatProviders_1.default)();
            const chatRoom = yield chatProviders.chatRoomProvider.findOne({ _id: chatRoomId });
            if (!chatRoom)
                throw new services_1.HttpError(404, 'Chat room is not found');
            //donst update users if private conv
            if (chatRoom.isPrivateConversation) {
                data.users = chatRoom.users;
                data.name = null;
            }
            if (!data.users || data.users.length == 0)
                throw new services_1.HttpError(403, 'Invalid input data');
            data.users = data.users;
            if (!data.users.includes(fromUserId))
                data.users.push(fromUserId);
            yield chatProviders.chatRoomProvider.updateOne({
                _id: chatRoomId,
            }, Object.assign(Object.assign({}, data), { updatedAt: new Date().toISOString(), updatedBy: fromUserId }));
            const updatedChatRoom = yield chatProviders.chatRoomProvider.findOne({ _id: chatRoomId });
            if (!updatedChatRoom)
                throw new services_1.HttpError(520);
            return updatedChatRoom;
        });
    }
    static delete(fromUserId, chatRoomIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const chatProviders = yield (0, chatProviders_1.default)();
            if (!chatRoomIds || chatRoomIds.length == 0)
                throw new services_1.HttpError(403, 'Nothing to delete');
            const chatRooms = yield chatProviders.chatRoomProvider.find({
                _id: chatRoomIds,
                users: { $in: [fromUserId] },
            }, {
                users: true,
                isPrivateConversation: true,
            });
            if (chatRooms.length < chatRoomIds.length) {
                throw new services_1.HttpError(404, 'ChatRooms not found');
            }
            for (const chatRoom of chatRooms) {
                //cant delete group chatRoom if you not a chatRoom creator
                if (!chatRoom.isPrivateConversation && chatRoom.createdBy != fromUserId) {
                    throw new services_1.HttpError(403, 'Access denied');
                }
            }
            const deleteStatus = yield chatProviders.chatRoomProvider.deleteMany({ _id: chatRoomIds });
            return deleteStatus;
        });
    }
    static getCurrentUnreadMessagesInfo(chatRoomId) {
        return __awaiter(this, void 0, void 0, function* () {
            const chatProviders = yield (0, chatProviders_1.default)();
            const chatRoom = yield chatProviders.chatRoomProvider.findOne({ _id: chatRoomId }, { unreadMessagesInfo: true });
            if (!chatRoom)
                return null;
            let unreadMessagesInfo = chatRoom.unreadMessagesInfo;
            for (const info of unreadMessagesInfo) {
                info.user = info.user;
                const count = yield chatProviders.messageProvider.count({
                    chatRoom: chatRoomId,
                    readByUsers: { $nin: [info.user] },
                    receivedByUsers: { $in: [info.user] },
                });
                info.unreadMessagesCount = count;
            }
            return unreadMessagesInfo;
        });
    }
}
exports.default = ChatRoomService;
//# sourceMappingURL=chatRoomService.js.map