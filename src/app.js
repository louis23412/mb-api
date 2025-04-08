import express from 'express';
import helmet from 'helmet';

import authRoute from './routes/auth.route.js';

const app = express();

app.use(helmet());

app.use('/auth', authRoute);

export default app;