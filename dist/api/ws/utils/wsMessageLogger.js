"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function wsLog(msg, event, userEmail) {
    if (!userEmail)
        userEmail = 'Anauthorized';
    console.log('WS: ' +
        event +
        '\n' +
        userEmail +
        '\n' +
        'messageType: ' +
        msg.messageType +
        '\n' +
        JSON.stringify(msg.data, null, 2) +
        '\n' +
        '--------------------------------');
}
exports.default = wsLog;
//# sourceMappingURL=wsMessageLogger.js.map