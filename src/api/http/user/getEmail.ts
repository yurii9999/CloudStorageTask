import ApiResponseHandler from '../apiResponseHandler';
import { Request, Response, NextFunction } from 'express';
import { AuthData, AuthorizedRequest, GetEmailMessage } from '../../../ts/types';
import UserService from '../../../services/userService';

export default async (req: AuthorizedRequest, res: Response<GetEmailMessage>) => {
    try {        
        const authData: AuthData = {_id : req._id}
        const {code, payload} = await UserService.getEmail(authData)
        await ApiResponseHandler.customSuccess(req, res, payload, code)
    } catch (error) {
        await ApiResponseHandler.error(req, res, error);
    }
};