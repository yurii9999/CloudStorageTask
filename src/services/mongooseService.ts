import mongoose from "mongoose";

export class MongooseService {
    static async connect() {
        const dbConnection = "mongodb+srv://testUser:mongo123@cluster0.duae8np.mongodb.net/myFirstDatabase"
        await mongoose.connect(dbConnection);
    }
}