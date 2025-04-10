import validator from "validator";

import { checkToken, createToken } from "../utils/tokens.js";
import { hashPass, compareHash } from "../utils/hash.js";
import { findUser, returnUser, registerUser } from "../models/launches.model.js";

export async function httpRegisterUser(req, res) {
    if (!req.body) {
        return res.status(400).json({
            error : "invalid request" 
        })
    }

    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({
            error : 'missing user data'
        })
    }

    if (typeof username !== 'string' || typeof password !== 'string' || typeof email !== 'string') {
        return res.status(400).json({
            error : 'invalid user data'
        })
    }

    if (
        !validator.isEmail(email) || 
        !validator.isAlphanumeric(username) || username.length < 5  || username.length > 15 ||
        !validator.isStrongPassword(password)
    ) {
        return res.status(400).json({
            error : 'invalid user data'
        })
    }

    const userExists = await findUser(username, email);

    if (userExists) {
        return res.status(409).json({
            error : 'username or email already registered'
        })
    }

    const hash = await hashPass(password);
    const registeredId = await registerUser(username, email, hash);

    if (!registeredId) {
        return res.status(500).json({
            error : 'user registration failed'
        })
    }

    const newToken = createToken(registeredId);
    req.session.token = newToken;

    return res.status(200).json({
        message : "new user registered",
        userId : registeredId
    })
}

export async function httpLoginUser(req, res) {
    if (req.session.token) {
        const isValidToken = checkToken(req.session.token);

        if (isValidToken) {
            return res.status(403).json({
                error : 'user already logged in',
                userId : isValidToken
            })
        }
    }

    if (!req.body) {
        return res.status(400).json({
            error : "invalid request" 
        })
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error : 'missing user data'
        })
    }

    if (typeof email !== 'string' || typeof password !== 'string') {
        return res.status(400).json({
            error : 'invalid user data'
        })
    }

    const user = await returnUser(email);

    if (!user) {
        return res.status(401).json({
            error : 'user not registered'
        })
    }

    const isValidPass = await compareHash(password, user.hash)

    if (!isValidPass) {
        return res.status(401).json({
            error : 'invalid username or password'
        })
    }

    const newToken = createToken(user.userId);
    req.session.token = newToken;

    return res.status(200).json({
        message : 'login success',
        userId : user.userId
    })
}

export function httpLogoutUser(req, res) {
    if (req.session.token) {
        req.session = null

        return res.status(200).json({
            message : 'logout success'
        })
    }

    res.status(401).json({
        error : 'not logged in'
    })
}