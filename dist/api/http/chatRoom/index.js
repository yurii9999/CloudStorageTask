"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (app) => {
    app.get('/chatRoom', require('./chatRoomList').default);
    app.post('/chatRoom', require('./chatRoomCreate').default);
    app.delete('/chatRoom', require('./chatRoomDelete').default);
    app.get('/chatRoom/:id', require('./chatRoomFindById').default);
    app.put('/chatRoom/:id', require('./chatRoomUpdate').default);
};
//# sourceMappingURL=index.js.map