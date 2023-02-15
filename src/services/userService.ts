import { User } from "../models/userModels";
import { NewUser, SignInData, SignInResponse } from "../ts/types";

export default class UserService {
    static async signUpUser(newUser: NewUser) {
        const user = new User( newUser );
        await user.save()
    }

    static async signInUser(signInData: SignInData): Promise<SignInResponse> {
        const user = await User.findOne( signInData )
        if ( user === null ) 
            return { message: "Incorrect login or password" }
            

        const token: string = "token"
        return { message: "Successfully signed in", token: token }
    }
}   