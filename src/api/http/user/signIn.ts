import ApiResponseHandler from '../apiResponseHandler';
import { Request, Response, NextFunction } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';


export default async (req: Request, res: Response) => {
    try {
        const userId = req.body.user_id
        const isMatch: boolean = userId

        if (isMatch) {
            const secret: Secret = "secret"
            const token = jwt.sign({ user_id: userId }, secret);
            return ApiResponseHandler.success(req, res, { user_id: userId, token: token}); 
        }

        return ApiResponseHandler.error(req, res, { message: "where's id?" })
    } catch (error) {
        await ApiResponseHandler.error(req, res, error);
    }
};
