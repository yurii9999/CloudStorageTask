import { User } from "../models/userModels";
import { NewUser, UserData, UserSearch } from "../ts/types";

export class UserProviders {
    static async createUser(newUser: NewUser) {
        const user = new User(newUser);
        await user.save()
    }

    static async findUser(search: UserSearch): Promise<UserData | null> {
        return await User.findOne(search)
    }
}