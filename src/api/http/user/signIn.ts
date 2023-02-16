import ApiResponseHandler from '../apiResponseHandler';
import { Request, Response } from 'express';
import { SignInData } from '../../../ts/types';
import UserService from '../../../services/userService';


export default async (req: Request, res: Response) => {
    try {
        const signInData: SignInData = req.body

        if ( !signInData.login || !signInData.password )
            return ApiResponseHandler.messageResponse(req, res, "You need login and password to sign in", 400)
        
        return ApiResponseHandler.success(req, res, await UserService.signInUser(signInData))
    } catch (error) {
        await ApiResponseHandler.error(req, res, error);
    }
};
