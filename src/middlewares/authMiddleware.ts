import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../services/jwtService';
import { AuthorizedRequest } from '../ts/types';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token)
            return next();

        try {
            (req as AuthorizedRequest)._id = JwtService.decode(token)._id
        }
        finally {
            return next();
        }
        
    } catch (error) {
        next(error);
    }
}
