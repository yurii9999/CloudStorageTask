import ApiResponseHandler from '../apiResponseHandler';
import { Request, Response } from 'express';
import { NewUser } from '../../../ts/types';
import UserService from '../../../services/userService';

export default async (req: Request, res: Response) => {
    try {
        const newUser:NewUser = req.body
        if ( !newUser.email || !newUser.password || !newUser.login )
            return ApiResponseHandler.messageResponse(req, res, "Specify email, login and password", 400)
        
        await UserService.signUpUser( newUser )

        return ApiResponseHandler.messageResponse(req, res, "User created", 200)
    } catch (error) {
        await ApiResponseHandler.error(req, res, error);
    }
};
