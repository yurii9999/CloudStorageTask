import { User } from "../models/userModels";
import { UserProviders } from "../providers/userProviders";
import { AuthData, NewUser, SignInData } from "../ts/types";
import { JwtService } from "./jwtService";

export default class UserService {
    static async signUpUser(newUser: NewUser) {
        if (!newUser.email || !newUser.login || !newUser.password)
            return { message: "You have to specify login, email and password to sign up" }

        UserProviders.createUser( newUser )

        return { message: "New user created" }
    }

    static async signInUser(signInData: SignInData) {
        if ( !signInData.login || !signInData.password )
            return { message: "You have to specify login and password to sign in" }
        
        const user = await UserProviders.findUser( signInData )
        if ( user === null ) 
            return { message: "Incorrect login or password" }
        
        const token: string = JwtService.sign( { _id: user._id.toString() } )
        return { message: "Successfully signed in", token: token }
    }

    static async getEmail(authData: AuthData) {
        if (!authData._id) 
            return { message: "You need to authorize to view email" }

        const user = await User.findById(authData)
        if ( user === null )
            return { message: "Can't find any users" }
        
        return { email: user.email }
    }
}   