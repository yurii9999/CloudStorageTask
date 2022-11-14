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
const chatProviders_1 = __importDefault(require("../../../services/utils/chatProviders"));
const wsController_1 = __importDefault(require("../../../services/utils/wsController"));
const wsResFactory_1 = __importDefault(require("../utils/wsResFactory"));
function processStartupHandShake(ws, event) {
    return __awaiter(this, void 0, void 0, function* () {
        const chatProviders = yield (0, chatProviders_1.default)();
        const userId = ws.userId;
        if (!userId)
            return;
        yield chatProviders.userProvider.updateOne({ _id: userId }, { online: true });
        const userChatRooms = yield chatProviders.chatRoomProvider.find({
            users: { $in: [userId] },
        }, {
            users: true,
        });
        const relatedUsersIds = userChatRooms
            .map((chatRoom) => {
            chatRoom.users = chatRoom.users;
            return chatRoom.users;
        })
            .flat(1);
        const response = new wsResFactory_1.default('onlineStatus');
        response.data = {
            online: true,
            userId,
        };
        const resJSON = response.toJSON();
        for (const relatedUserId of relatedUsersIds) {
            if (relatedUserId == userId)
                continue;
            const connection = wsController_1.default.get(relatedUserId);
            if (!connection)
                continue;
            connection.send(resJSON);
        }
    });
}
exports.default = processStartupHandShake;
//# sourceMappingURL=startupHandShake.js.map