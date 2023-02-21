import ApiResponseHandler from '../apiResponseHandler';
import { Request, Response } from 'express';
import { SignInData, SignInMessage } from '../../../ts/types';
import UserService from '../../../services/userService';


export default async (req: Request<{},{}, SignInData>, res: Response<SignInMessage>) => {
    try {
        const signInData: SignInData = req.body
        const {code, payload} = await UserService.signInUser(signInData)
        await ApiResponseHandler.customSuccess(req, res, payload, code)
    } catch (error) {
        await ApiResponseHandler.error(req, res, error);
    }
};
