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
const chatRoomService_1 = __importDefault(require("../../../services/chatRoomService"));
const chatProviders_1 = __importDefault(require("../../../services/utils/chatProviders"));
const wsController_1 = __importDefault(require("../../../services/utils/wsController"));
const wsController_2 = __importDefault(require("../../../services/utils/wsController"));
const wsResFactory_1 = __importDefault(require("../utils/wsResFactory"));
function processChatRoomEvent(ws, event) {
    return __awaiter(this, void 0, void 0, function* () {
        const chatProviders = yield (0, chatProviders_1.default)();
        const fromUserId = ws.userId;
        if (!fromUserId)
            return;
        if (!event.chatRoomId)
            return;
        const chatRoom = yield chatProviders.chatRoomProvider.findOne({ _id: event.chatRoomId });
        if (!chatRoom) {
            const response = new wsResFactory_1.default('error');
            response.data = {
                code: 404,
                message: 'Chat room is not found',
            };
            ws.send(response.toJSON());
            return;
        }
        const chatRoomUsersIds = chatRoom.users.map((user) => {
            user = user;
            return user;
        });
        if (event.isTyping !== undefined && event.isTyping !== null) {
            const response = new wsResFactory_1.default('typingStatus');
            response.data = {
                chatRoomId: chatRoom.id,
                isTyping: event.isTyping,
                userId: fromUserId,
            };
            const resJSON = response.toJSON();
            for (const chatRoomUserId of chatRoomUsersIds) {
                if (chatRoomUserId == fromUserId)
                    continue;
                const connection = wsController_2.default.get(chatRoomUserId);
                if (!connection)
                    continue;
                connection.send(resJSON);
            }
            return;
        }
        if (event.readMessagesIds && event.readMessagesIds.length != 0) {
            const messagesIds = event.readMessagesIds;
            yield chatProviders.messageProvider.updateMany({
                _id: messagesIds,
            }, {
                $push: { readByUsers: fromUserId },
                status: 'seen',
            });
            let unreadMessagesInfo = yield chatRoomService_1.default.getCurrentUnreadMessagesInfo(chatRoom.id);
            if (!unreadMessagesInfo)
                return;
            for (const info of unreadMessagesInfo) {
                info.user = info.user;
                if (info.user == fromUserId) {
                    info.unreadMessagesCount -= event.readMessagesIds.length;
                }
            }
            yield chatProviders.chatRoomProvider.updateOne({
                _id: chatRoom.id,
            }, {
                unreadMessagesInfo,
            });
            const response = new wsResFactory_1.default('readMessages');
            response.data = {
                userId: fromUserId,
                chatRoomId: chatRoom.id,
                readMessagesIds: messagesIds,
            };
            const resJSON = response.toJSON();
            for (let userId of chatRoom.users) {
                userId = userId;
                if (userId == fromUserId)
                    continue;
                const connection = wsController_1.default.get(userId);
                if (!connection)
                    continue;
                connection.send(resJSON);
            }
            return;
        }
    });
}
exports.default = processChatRoomEvent;
//# sourceMappingURL=chatRoomEvent.js.map