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
Object.defineProperty(exports, "__esModule", { value: true });
const databaseProviders_1 = require("databaseProviders");
const databaseConnection_1 = require("databaseProviders/lib/database/databaseConnection");
function initChatProviders() {
    return __awaiter(this, void 0, void 0, function* () {
        const database = yield (0, databaseConnection_1.databaseInit)();
        const chatRoomProvider = new databaseProviders_1.ChatRoomProvider({ database });
        const messageProvider = new databaseProviders_1.MessageProvider({ database });
        const userProvider = new databaseProviders_1.UserProvider({ database });
        return { chatRoomProvider, messageProvider, userProvider };
    });
}
exports.default = initChatProviders;
//# sourceMappingURL=chatProviders.js.map