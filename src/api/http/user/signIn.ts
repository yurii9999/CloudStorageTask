import ApiResponseHandler from '../apiResponseHandler';
import { Request, Response, NextFunction } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { AuthData } from '../../../ts/types';


export default async (req: Request, res: Response) => {
    try {
        const userId = req.body.user_id
        const isMatch: boolean = userId

        if (isMatch) {
            const secret: Secret = "secret"
            const payload: AuthData = { user_id : userId }
            const token = jwt.sign(payload, secret);
            return ApiResponseHandler.success(req, res, { token: token }); 
        }

        return ApiResponseHandler.messageResponse(req, res, "Please, specify id", 400)
    } catch (error) {
        await ApiResponseHandler.error(req, res, error);
    }
};
