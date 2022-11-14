"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (app) => {
    app.get('/example', require('./getExampleMessage').default);
    app.post('/example/echo', require('./echoMessage').default);
};
//# sourceMappingURL=index.js.map