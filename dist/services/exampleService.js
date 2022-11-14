"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExampleService {
    static getHelloMessage() {
        return {
            message: 'Hello!',
            date: new Date().toISOString()
        };
    }
    static echo(message) {
        return {
            message,
            date: new Date().toISOString(),
            isEcho: true
        };
    }
}
exports.default = ExampleService;
//# sourceMappingURL=exampleService.js.map