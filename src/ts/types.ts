//------------------------------------------------------------|
//                  Example Message Types                     |
//------------------------------------------------------------/

export type ExampleMessage = {
    message: string,
    date: string
}

export type EchoMessage = {
    isEcho: boolean
} & ExampleMessage;


import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export type AuthData =  {
    user_id: string | null
}

export type AuthRequest = Request & AuthData

export type ExpectedJwrPayload = JwtPayload & AuthData