import express from 'express';

export default (app: express.Application) => {
    app.get(
        '/example', 
        require('./getExampleMessage').default
    );
    app.post(
        '/example/echo', 
        require('./echoMessage').default
    );
};
