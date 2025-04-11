import { Router }  from 'express'

import { checkToken } from '../../utils/tokens.js'
import {  } from './planets.controller.js';

const planetsRoute = Router();

planetsRoute.use((req, res, next) => {
    if (req.session.token) {
        const isValidToken = checkToken(req.session.token);

        if (!isValidToken) {
            return res.status(401).json({
                error : 'access denied'
            })
        }
    } else if (!req.session.token) {
        return res.status(401).json({
            error : 'access denied'
        })
    }

    next();
})

planetsRoute.get('/test', (req, res) => {
    res.json({
        message : 'test test'
    })
});

export default planetsRoute;