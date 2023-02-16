import ApiResponseHandler from '../apiResponseHandler';
import { Request, Response, NextFunction } from 'express';
import { AuthData, GetEmailMessage } from '../../../ts/types';
import UserService from '../../../services/userService';

export default async (req: Request<AuthData>, res: Response<GetEmailMessage>) => {
    try {
        const authData: AuthData = req.params
        const response = await UserService.getEmail(authData)
        await ApiResponseHandler.success(req, res, response)
    } catch (error) {
        await ApiResponseHandler.error(req, res, error);
    }
};