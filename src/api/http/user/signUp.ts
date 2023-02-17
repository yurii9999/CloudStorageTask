import ApiResponseHandler from '../apiResponseHandler';
import { Request, Response } from 'express';
import { NewUser, SignUpMessage } from '../../../ts/types';
import UserService from '../../../services/userService';

export default async (req: Request<{}, {}, NewUser>, res: Response<SignUpMessage>) => {
    try {
        const newUser:NewUser = req.body        
        const response = await UserService.signUpUser(newUser)
        await ApiResponseHandler.success(req, res, response)
    } catch (error) {
        await ApiResponseHandler.error(req, res, error);
    }
};
