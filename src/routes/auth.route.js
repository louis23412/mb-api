import { Router }  from 'express'
import jwt from 'jsonwebtoken';

const authRoute = Router();

authRoute.post('/register', (req, res) => {
    const token = jwt.sign({ foo: 'bar' }, 'use secret key from .env here');

    res.status(501).json({
        tokenTest : token
    })
})

authRoute.post('/login', (req, res) => {
    const token = jwt.sign({ foo: 'bar' }, 'use secret key from .env here');

    res.status(501).json({
        tokenTest : token
    })
})

authRoute.post('/logout', (req, res) => {
    const token = jwt.sign({ foo: 'bar' }, 'use secret key from .env here');

    res.status(501).json({
        tokenTest : token
    })
})

export default authRoute;