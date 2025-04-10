import { Router }  from 'express'

import { httpLoginUser, httpRegisterUser, httpLogoutUser } from './auth.controller.js';

const authRoute = Router();

authRoute.use((req, res, next) => {
    if (!req.body) {
        return res.status(400).json({
            error : "invalid request" 
        })
    }

    next();
})

authRoute.post('/register', httpRegisterUser);
authRoute.post('/login', httpLoginUser);
authRoute.post('/logout', httpLogoutUser)

export default authRoute;