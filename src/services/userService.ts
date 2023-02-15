import { User } from "../models/userModels";
import { AuthData, NewUser, SignInData, SignInResponse } from "../ts/types";
import { JwtService } from "./jwtService";

export default class UserService {
    static async signUpUser(newUser: NewUser) {
        const user = new User( newUser );
        await user.save()
    }

    static async signInUser(signInData: SignInData): Promise<SignInResponse> {
        const user = await User.findOne( signInData )
        if ( user === null ) 
            return { message: "Incorrect login or password" }
        
        const token: string = await JwtService.sign( { user_id: user._id.toString() } )
        return { message: "Successfully signed in", token: token }
    }

    static async getEmail(authData: AuthData) {
        const user = await User.findById(authData.user_id)
        if ( user === null )
            return { message: "Can't find any users" }
        
        return { email: user.email }
    }
}   