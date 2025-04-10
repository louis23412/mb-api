import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import cookieSession from 'cookie-session';
import { rateLimit } from 'express-rate-limit'

import authRoute from './routes/auth.route.js';

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
})

const app = express();

app.use(limiter);

app.use(helmet());

app.use(cookieSession({
    name: 'session',
    keys: [process.env.COOKIE_KEY_1, process.env.COOKIE_KEY_2],
    maxAge: 24 * 60 * 60 * 1000
}));

app.use(express.json());
app.use(morgan("short"));

app.use('/auth', authRoute);

export default app;