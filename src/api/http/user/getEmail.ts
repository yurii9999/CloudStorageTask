import ApiResponseHandler from '../apiResponseHandler';
import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../../../ts/types';

export default async (req: Request, res: Response) => {
    try {
        const userId = (req as AuthRequest).user_id
        const targetId = "63ed0345e28cd7fcef29d529"

        if ( !userId || userId !== targetId)
            return ApiResponseHandler.success(req, res, { message: "Not a secret" });    
        
        return ApiResponseHandler.success(req, res, { message: "Secret" });
    } catch (error) {
        await ApiResponseHandler.error(req, res, error);
    }
};
