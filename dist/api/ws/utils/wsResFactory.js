"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WsResponse {
    constructor(responseType) {
        this.responseType = responseType;
    }
    toJSON() {
        let obj = Object.assign(this);
        obj.toJSON = undefined;
        return JSON.stringify(obj);
    }
}
exports.default = WsResponse;
//# sourceMappingURL=wsResFactory.js.map