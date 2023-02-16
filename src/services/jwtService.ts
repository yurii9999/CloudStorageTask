import { Secret, sign, verify } from "jsonwebtoken";
import { getConfig } from "../config";
import { AuthData, ExpectedJwrPayload } from "../ts/types";

const secret: Secret = getConfig().AUTH_JWT_SECRET || "DefaultSecret"

export class JwtService {
    static sign(payload: AuthData) {
        const token = sign(payload, secret);
        return token
    }

    static decode(token: string) {
        return verify(token, secret) as ExpectedJwrPayload
    }
}