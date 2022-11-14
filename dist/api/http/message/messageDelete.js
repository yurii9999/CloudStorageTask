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
const apiResponseHandler_1 = __importDefault(require("../apiResponseHandler"));
const services_1 = require("services");
const messageService_1 = __importDefault(require("../../../services/messageService"));
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.currentUser)
            throw new services_1.HttpError(401);
        const deleteStatus = yield messageService_1.default.delete(req.currentUser.id, req.query.ids);
        yield apiResponseHandler_1.default.success(req, res, deleteStatus);
    }
    catch (error) {
        yield apiResponseHandler_1.default.error(req, res, error);
    }
});
//# sourceMappingURL=messageDelete.js.map