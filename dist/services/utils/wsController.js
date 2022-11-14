"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WsController {
    constructor() {
        this.connections = {};
    }
    add(userId, connection) {
        if (this.connections[userId])
            return;
        connection.userId = userId;
        this.connections[userId] = connection;
    }
    get(userId) {
        const connection = this.connections[userId];
        if (!connection)
            return null;
        return connection;
    }
    delete(userId) {
        if (!userId)
            return false;
        const connection = this.get(userId);
        if (!connection)
            return false;
        connection.close();
        delete this.connections[userId];
        if (this.connections[userId])
            return false;
        return true;
    }
}
const UserWsConnections = new WsController();
exports.default = UserWsConnections;
//# sourceMappingURL=wsController.js.map