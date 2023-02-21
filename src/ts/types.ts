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

export type UserData = {
    login: string,
    password: string,
    email: string,
    _id: string
}

export type NewUser = Pick<UserData, "password" | "email" | "login">

export type UserSearch = Partial<UserData>

export type SignUpMessage = Message


export type SignInData = Pick<UserData, "login" | "password">

export type SignInMessage = Message & { token?: string }

import { JwtPayload } from 'jsonwebtoken';

export type AuthData = Pick<UserData, "_id">

export type ExpectedJwrPayload = JwtPayload & AuthData