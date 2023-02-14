import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AuthRequest, ExpectedJwrPayload } from '../ts/interfaces';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const secret: jwt.Secret = "secret"
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            (req as AuthRequest).user_id = null
            return next();
        }

        const decoded = jwt.verify(token, secret) as ExpectedJwrPayload
        if (!decoded.user_id)
            (req as AuthRequest).user_id = null
        else 
            (req as AuthRequest).user_id = decoded.user_id
        
        return next();
    } catch (error) {
        next(error);
    }
}
