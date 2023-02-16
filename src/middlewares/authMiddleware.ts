import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AuthData, AuthRequest, ExpectedJwrPayload } from '../ts/types';

export async function authMiddleware(req: Request<AuthData>, res: Response, next: NextFunction) {
    try {       
        const secret: jwt.Secret = "secret"
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token)
            return next();

        const decoded = jwt.verify(token, secret) as ExpectedJwrPayload
        req.params = decoded
        
        return next();
    } catch (error) {
        next(error);
    }
}
