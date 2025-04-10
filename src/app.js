import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import cookieSession from 'cookie-session';

import authRoute from './routes/auth.route.js';

const app = express();

app.use(helmet());

app.use(cookieSession({
    name: 'session',
    keys: [process.env.COOKIE_KEY_1, process.env.COOKIE_KEY_2],
    maxAge: 24 * 60 * 60 * 1000
}));

app.use(express.json());
app.use(morgan("short"));

app.use((req, res, next) => {
    if (!req.body) {
        return res.status(400).json({
            error : "invalid request" 
        })
    }

    next();
})

app.use('/auth', authRoute);

export default app;