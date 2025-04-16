import { Router }  from 'express'

import { httpLogoutUser } from './auth.controller.js';

const authRoute = Router();

authRoute.post('/logout', httpLogoutUser);

export default authRoute;