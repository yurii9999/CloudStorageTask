import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AuthRequest, ExpectedJwrPayload } from '../ts/types';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {       
        const secret: jwt.Secret = "secret"
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token)
            return next();

        const decoded = jwt.verify(token, secret) as ExpectedJwrPayload
        if (decoded.user_id)
            req.params.user_id = decoded.user_id
        
        return next();
    } catch (error) {
        next(error);
    }
}
