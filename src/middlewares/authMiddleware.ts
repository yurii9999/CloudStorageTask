import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../services/jwtService';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token)
            return next();

        req.params = JwtService.decode(token)
        
        return next();
    } catch (error) {
        next(error);
    }
}
