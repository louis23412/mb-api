import express from 'express';
import helmet from 'helmet';
import cookieSession from 'cookie-session';

import authRoute from './routes/auth.route.js';

const app = express();

app.use(helmet());

app.use(express.json());

app.use(cookieSession({
    name: 'session',
    keys: [process.env.COOKIE_KEY_1, process.env.COOKIE_KEY_2],
    maxAge: 24 * 60 * 60 * 1000
}))

app.use('/auth', authRoute);

export default app;