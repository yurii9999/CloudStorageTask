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
exports.authMiddleware = void 0;
const apiResponseHandler_1 = __importDefault(require("../api/http/apiResponseHandler"));
const services_1 = require("services");
/**
 * Authenticates and fills the request with the user if it exists.
 * If no token is passed, it continues the request but without filling the currentUser.
 * If userAutoAuthenticatedEmailForTests exists and no token is passed, it fills with this user for tests.
 */
function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isTokenEmpty = (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
            !(req.cookies && req.cookies.__session);
        if (isTokenEmpty) {
            return next();
        }
        let idToken;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            // Read the ID Token from the Authorization header.
            idToken = req.headers.authorization.split('Bearer ')[1];
        }
        else if (req.cookies) {
            // Read the ID Token from cookie.
            idToken = req.cookies.__session;
        }
        else {
            return next();
        }
        try {
            const currentUser = yield services_1.UserUtils.findByJWT(idToken);
            req.currentUser = currentUser ? currentUser : undefined;
            return next();
        }
        catch (error) {
            console.error(error);
            yield apiResponseHandler_1.default.error(req, res, new services_1.HttpError(401));
        }
    });
}
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authMiddleWare.js.map