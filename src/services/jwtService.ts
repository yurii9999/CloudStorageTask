import { Secret, sign, verify } from "jsonwebtoken";
import { AuthData, ExpectedJwrPayload } from "../ts/types";

const secret: Secret = "secret"

export class JwtService {
    static sign(payload: AuthData) {
        const token = sign(payload, secret);
        return token
    }

    static decode(token: string) {
        return verify(token, secret) as ExpectedJwrPayload
    }
}