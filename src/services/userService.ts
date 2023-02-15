import { User } from "../models/userModels";
import { NewUser } from "../ts/types";

export default class UserService {
    static async signUpUser(newUser: NewUser) {
        const user = new User( newUser );
        await user.save()
    }    
}   