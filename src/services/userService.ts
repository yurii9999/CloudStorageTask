import { User } from "../models/userModel";
import { NewUser } from "../ts/types";

export default class UserService {
    static async signUpUser(newUser: NewUser) {
        const user = new User( {login: newUser.login, email: newUser.email, password: newUser.password} );
        await user.save()
    }    
}   