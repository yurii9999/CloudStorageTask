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
const httpError_1 = require("../../utils/httpError");
class ApiResponseHandler {
    static download(req, res, path) {
        return __awaiter(this, void 0, void 0, function* () {
            res.download(path);
        });
    }
    static success(req, res, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (payload !== undefined) {
                res.status(200).send(payload);
            }
            else {
                res.sendStatus(200);
            }
        });
    }
    static customSuccess(req, res, payload, code) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!code)
                code = 200;
            if (payload !== undefined) {
                res.status(code).send(payload);
            }
            else {
                res.sendStatus(code);
            }
        });
    }
    /**
     * 204 status code
     */
    static NoContentSuccess(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.customSuccess(req, res, undefined, 204);
        });
    }
    static error(req, res, error) {
        return __awaiter(this, void 0, void 0, function* () {
            if (error instanceof httpError_1.HttpError) {
                res.status(error.code).send(error.message);
            }
            else {
                console.error(error);
                res.status(500).send(error);
            }
        });
    }
}
exports.default = ApiResponseHandler;
//# sourceMappingURL=apiResponseHandler.js.map