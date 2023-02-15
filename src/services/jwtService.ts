import { Secret, sign } from "jsonwebtoken";
import { AuthData } from "../ts/types";

export class JwtService {
    static async sign(payload: AuthData): Promise<string> {
        const secret: Secret = "secret"
        const token = sign(payload, secret);
        return token
    }

    
}