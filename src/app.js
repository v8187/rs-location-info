import helmet from 'helmet';
import { urlencoded, json } from 'body-parser';
import express from 'express';
import cors from 'cors';

import { locationRouter } from './routers/location.router';
import { initDatabase } from './db';

const app = express();

export const initApp = () => {
    /**
     * Disable the X-Powered-By header (in lower-case). Attackers can use this header (which is enabled by default)
     * to detect apps running Express and then launch specifically-targeted attacks.
     */
    app.use(helmet());

    // Set App Configurations
    app.use(urlencoded({ extended: false }));
    app.use(json());

    // Initialize Database
    initDatabase();

    // Configure CORS
    app.use(cors());

    // Configure Routers
    app.get('/', (req, res) => res.send('Hello'));
    app.use('/api', locationRouter);

    // Handle undefined routes
    app.use('*', function (req, res) {
        res.status(404).json({
            type: 'NOT_FOUND',
            error: 'Route not found',
            messsage: `"${req.method}" request for path "${req.originalUrl}" does not exist.`
        }).end();
    });

    return app;
};