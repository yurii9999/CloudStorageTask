import { EchoMessage, ExampleMessage } from "../ts/types";

export default class ExampleService {

    static getHelloMessage(): ExampleMessage {
        return {
            message: 'Hello!',
            date: new Date().toISOString()
        };
    }

    static echo(message: string): EchoMessage {
        return {
            message,
            date: new Date().toISOString(),
            isEcho: true
        };
    }
    
}   