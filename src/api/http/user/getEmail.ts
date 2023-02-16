import ApiResponseHandler from '../apiResponseHandler';
import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../../../ts/types';
import UserService from '../../../services/userService';

export default async (req: Request, res: Response) => {
    try {
        const userId = req.params.user_id
        if ( !userId )
            return ApiResponseHandler.messageResponse(req, res, "You need to authorize to view email", 400)

        return ApiResponseHandler.success(req, res, await UserService.getEmail( { user_id: userId }))
    } catch (error) {
        await ApiResponseHandler.error(req, res, error);
    }
};