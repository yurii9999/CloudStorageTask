import { User } from "../models/userModels";
import { AuthData, NewUser, SignInData, SignUpMessage } from "../ts/types";
import { JwtService } from "./jwtService";

export default class UserService {
    static async signUpUser(newUser: NewUser) {
        if (!newUser.email || !newUser.login || !newUser.password)
            return { message: "You have to specify login, email and password to sign up" }

        const user = new User( newUser );
        await user.save()
        return { message: "New user created" }
    }

    static async signInUser(signInData: SignInData) {
        if ( !signInData.login || !signInData.password )
            return { message: "You have to specify login and password to sign in" }
        const user = await User.findOne( signInData )
        if ( user === null ) 
            return { message: "Incorrect login or password" }
        
        const token: string = JwtService.sign( { user_id: user._id.toString() } )
        return { message: "Successfully signed in", token: token }
    }

    static async getEmail(authData: AuthData) {
        if (!authData.user_id) 
            return { message: "You need to authorize to view email" }

        const user = await User.findById(authData.user_id)
        if ( user === null )
            return { message: "Can't find any users" }
        
        return { email: user.email }
    }
}   