"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (app) => {
    app.get('/message', require('./messageList').default);
    app.post('/message', require('./messageCreate').default);
    app.delete('/message', require('./messageDelete').default);
    app.get('/message/:id', require('./messageFindById').default);
    // app.put(
    //     '/message/:id',
    //     require('./chatRoomUpdate').default
    // );
};
//# sourceMappingURL=index.js.map