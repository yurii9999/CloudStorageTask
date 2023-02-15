import ApiResponseHandler from '../apiResponseHandler';
import { Request, Response, NextFunction } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { AuthData, SignInData } from '../../../ts/types';
import UserService from '../../../services/userService';


export default async (req: Request, res: Response) => {
    try {
        if ( !req.body.login || !req.body.password )
            return ApiResponseHandler.messageResponse(req, res, "You need login and password to sign in", 400)
        
        const signInData: SignInData = { login: req.body.login, password: req.body.password }
        return ApiResponseHandler.success(req, res, await UserService.signInUser(signInData))
    } catch (error) {
        await ApiResponseHandler.error(req, res, error);
    }
};
