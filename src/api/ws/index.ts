import { Request } from 'express';
import { WebSocket } from 'ws';

export default function wsHandler(ws: WebSocket, req: Request) {
    ws.on('message', async (jsonMsg: string) => {
       
    });

    ws.on('close', () => {
       
    });

    ws.on('error', () => {
        
    });
}
