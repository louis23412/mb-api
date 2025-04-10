import { Router }  from 'express'

import { httpLoginUser, httpRegisterUser, httpLogoutUser } from './auth.controller.js';

const authRoute = Router();

authRoute.post('/register', httpRegisterUser);
authRoute.post('/login', httpLoginUser);
authRoute.post('/logout', httpLogoutUser);

export default authRoute;