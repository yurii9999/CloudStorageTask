import ApiResponseHandler from '../apiResponseHandler';
import { Request, Response, NextFunction } from 'express';
import { AuthData, GetEmailMessage } from '../../../ts/types';
import UserService from '../../../services/userService';

export default async (req: Request<AuthData>, res: Response<GetEmailMessage>) => {
    try {
        const authData: AuthData = req.params
        const {code, payload} = await UserService.getEmail(authData)
        await ApiResponseHandler.customSuccess(req, res, payload, code)
    } catch (error) {
        await ApiResponseHandler.error(req, res, error);
    }
};