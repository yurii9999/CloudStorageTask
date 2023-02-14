import express from 'express';
import { authMiddleware } from '../../../middlewares/AuthMiddleware';

export default (app: express.Application) => {
    app.post(
        '/signin', 
        require('./signIn').default
    );
    app.get(
        '/profile/email', 
        authMiddleware,
        require('./getEmail').default
    );
};
