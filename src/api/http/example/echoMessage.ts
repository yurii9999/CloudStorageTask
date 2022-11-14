import ApiResponseHandler from '../apiResponseHandler';
import { Request, Response, NextFunction } from 'express';
import ExampleService from '../../../services/exampleService';
import { EchoMessage, ExampleMessage } from '../../../ts/types';


export default async (req: Request<{}, {}, { message: string }>, res: Response<EchoMessage>, next: NextFunction) => {
    try {
        
        const message = ExampleService.echo(req.body.message);

        await ApiResponseHandler.success(req, res, message);
    } catch (error) {
        await ApiResponseHandler.error(req, res, error);
    }
};
