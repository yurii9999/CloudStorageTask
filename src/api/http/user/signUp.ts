import ApiResponseHandler from '../apiResponseHandler';
import { Request, Response } from 'express';
import { UserData, SignInMessage } from '../../../ts/types';
import UserService from '../../../services/userService';

export default async (req: Request<{}, {}, UserData>, res: Response<SignInMessage>) => {
    try {
        const newUser:UserData = req.body        
        const response = await UserService.signUpUser( newUser )
        await ApiResponseHandler.success(req, res, response)
    } catch (error) {
        await ApiResponseHandler.error(req, res, error);
    }
};
