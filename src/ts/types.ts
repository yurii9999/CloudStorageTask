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

export type GetEmailResponse = {
    message?: string,
    email?: string
}

export type NewUser = {
    login: string,
    password: string,
    email: string
}

export type SignUpResponse = {
    message: string
}

export type SignInData = {
    login: string,
    password: string
}

export type SignInResponse = {
    message: string,
    token?: string
}

import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export type AuthData =  {
    user_id: string
}

export type AuthRequest = Request & AuthData

export type ExpectedJwrPayload = JwtPayload & AuthData