import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import cookieSession from 'cookie-session';
import { rateLimit } from 'express-rate-limit'

import graphqlRoute from './routes/graphql.route.js';

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	limit: 25,
	standardHeaders: 'draft-8',
	legacyHeaders: false,
})

const app = express();

app.use(limiter);

app.use(helmet());
app.use(cors({
	origin : 'https://localhost'
}));

app.use(cookieSession({
    name: 'session',
    keys: [process.env.COOKIE_KEY_1, process.env.COOKIE_KEY_2],
    maxAge: Number(process.env.SESSION_EXPIRATION_MINUTES) * 60 * 1000,
	priority : 'high',
	sameSite : 'strict',
	secure : true,
	httpOnly : true,
	signed : true
}));

app.use(express.json());
app.use(morgan("short"));

app.use('/graphql', graphqlRoute);

export default app;