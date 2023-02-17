import mongoose from "mongoose";
import { getConfig } from "../config";

const dbConnection = getConfig().DATABASE_CONNECTION || "mongodb+srv://testUser:mongo123@cluster0.duae8np.mongodb.net/myFirstDatabase"

export class MongooseService {
    static async connect() {
        mongoose.set('strictQuery', true)
        await mongoose.connect(dbConnection);
    }
}