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


type Message = {
    message?: string
}

export type GetEmailMessage = Message & { email?: string }

export type NewUser = {
    login: string,
    password: string,
    email: string
}

export type SignUpMessage = Message

export type SignInData = {
    login: string,
    password: string
}

export type SignInMessage = Message & { token?: string }

import { JwtPayload } from 'jsonwebtoken';

export type AuthData =  {
    user_id: string
}

export type ExpectedJwrPayload = JwtPayload & AuthData