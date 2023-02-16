import ApiResponseHandler from '../apiResponseHandler';
import { Request, Response, NextFunction } from 'express';
import { AuthData } from '../../../ts/types';
import UserService from '../../../services/userService';

export default async (req: Request<AuthData>, res: Response) => {
    try {
        const authData: AuthData = req.params
        
        if (!authData.user_id)
            return ApiResponseHandler.messageResponse(req, res, "You need to authorize to view email", 400)

        return ApiResponseHandler.success(req, res, await UserService.getEmail(authData))
    } catch (error) {
        await ApiResponseHandler.error(req, res, error);
    }
};