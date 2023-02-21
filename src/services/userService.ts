import mongoose from "mongoose";
import { MongoError } from 'mongodb';
import { UserProviders } from "../providers/userProviders";
import { AuthData, NewUser, SignInData } from "../ts/types";
import { JwtService } from "./jwtService";

class Utils {
    static response(code: number, payload: any) { return {payload, code} }
    static justMessageResponse(code: number, message: string) { return Utils.response(code, {message}) } // can't write just response(), have to write Utils.response() or this.response()
}

export default class UserService {
    static async signUpUser(newUser: NewUser) {
        if (!newUser.email || !newUser.login || !newUser.password)
            return Utils.response(400, {message: "You have to specify login, email and password to sign up"})

        try {
            await UserProviders.createUser( newUser )
        } catch(error) {
            if ((error as MongoError).code === 11000)
                return Utils.response(200, { message: "Login or email is(or are idk) already used" })
                // same story as below

            return Utils.response(500, {message: "Unknown Error"})
        }
        
        return {payload: { message: "New user created" }, code: 200}
    }

    static async signInUser(signInData: SignInData) {
        if (!signInData.login || !signInData.password)
            return Utils.response(400, {message: "You have to specify login and password to sign in"})
        
        const user = await UserProviders.findUser(signInData)
        if (user === null)
            return Utils.response(200, {message: "Incorrect login or password"})
            // user wasn't found, but code == 200
            // https://stackoverflow.com/questions/32752578/whats-the-appropriate-http-status-code-to-return-if-a-user-tries-logging-in-wit#:~:text=If%20you%20try%20to%20log,indicates%20the%20password%20was%20incorrect.
        
        const token: string = JwtService.sign( { _id: user._id.toString() } )
        return Utils.response(200, {message: "Successfully signed in", token: token})
    }

    static async getEmail(authData: AuthData) {
        if (!authData._id) 
            return Utils.response(401, {message: "You need to authorize to view email"})

        const user = await UserProviders.findUser(authData)
        if ( user === null )
            return Utils.response(404, {message: "Can't find any users"})
        
        return Utils.response(200, {email: user.email})
    }
}   