import ApiResponseHandler from '../apiResponseHandler';
import { Request, Response, NextFunction } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { NewUser } from '../../../ts/types';
import UserService from '../../../services/userService';

export default async (req: Request, res: Response) => {
    try {
        if ( !req.body.email || !req.body.password || !req.body.login )
            return ApiResponseHandler.messageResponse(req, res, "Specify email, login and password", 400)
        
        let newUser: NewUser = {
            email: req.body.email,
            login: req.body.login,
            password: req.body.password
        }
        
        await UserService.signUpUser( newUser )

        return ApiResponseHandler.messageResponse(req, res, "User created", 200)
    } catch (error) {
        await ApiResponseHandler.error(req, res, error);
    }
};
