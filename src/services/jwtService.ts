import { Secret, sign, verify } from "jsonwebtoken";
import { getConfig } from "../config";
import { AuthData, ExpectedJwtPayload as ExpectedJwtPayload } from "../ts/types";

const AUTH_JWT_SECRET = getConfig().AUTH_JWT_SECRET;
if (AUTH_JWT_SECRET === undefined)
    throw new Error("Specify secret key as AUTH_JWT_SECRET in .env")

const secret: Secret = AUTH_JWT_SECRET as string
    

export class JwtService {
    static sign(payload: AuthData) {
        const token = sign(payload, secret);
        return token
    }

    static decode(token: string) {
        return verify(token, secret) as ExpectedJwtPayload
    }
}