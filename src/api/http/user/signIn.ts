import ApiResponseHandler from '../apiResponseHandler';
import { Request, Response } from 'express';
import { SignInData, SignInMessage } from '../../../ts/types';
import UserService from '../../../services/userService';


export default async (req: Request<{},{}, SignInData>, res: Response<SignInMessage>) => {
    try {
        const signInData: SignInData = req.body
        const signInResponse = await UserService.signInUser(signInData)
        await ApiResponseHandler.success(req, res, signInResponse)
    } catch (error) {
        await ApiResponseHandler.error(req, res, error);
    }
};
