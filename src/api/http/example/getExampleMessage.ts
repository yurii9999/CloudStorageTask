import ApiResponseHandler from '../apiResponseHandler';
import { Request, Response, NextFunction } from 'express';
import { ExampleMessage } from '../../../ts/types';
import ExampleService from '../../../services/exampleService';

export default async (req: Request, res: Response<ExampleMessage>, next: NextFunction) => {
    try {
        
        const message = ExampleService.getHelloMessage();

        await ApiResponseHandler.success(req, res, message);
    } catch (error) {
        await ApiResponseHandler.error(req, res, error);
    }
};
