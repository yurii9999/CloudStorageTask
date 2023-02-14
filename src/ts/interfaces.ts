//------------------------------------------------------------|
//                     Some Interfaces                        |
//------------------------------------------------------------/

import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user_id?: string | null
}

export interface ExpectedJwrPayload extends JwtPayload {
    user_id: string | null
}
