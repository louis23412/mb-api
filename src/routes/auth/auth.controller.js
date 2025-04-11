import validator from "validator";

import { checkToken, createToken } from "../../utils/tokens.js";
import { hashPass, compareHash } from "../../utils/hash.js";
import { findUser, returnUser, registerUser, updateLoginTime } from "../../models/users/users.model.js";

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
    const registered = await registerUser(username, email, hash);

    if (!registered) {
        return res.status(500).json({
            error : 'user registration failed'
        })
    }

    const newToken = createToken(username);
    req.session.token = newToken;

    return res.status(200).json({
        message : "new user registered",
        username : username
    })
}

export async function httpLoginUser(req, res) {
    if (req.session.token) {
        const loggedInUsername = checkToken(req.session.token);

        if (loggedInUsername) {
            return res.status(400).json({
                error : 'user already logged in',
                username : loggedInUsername
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

    const loginUpdate = await updateLoginTime(user.username, new Date());

    if (!loginUpdate) {
        return res.status(500).json({
            error : 'login failed'
        })
    }
    //2025-04-11T18:23:13.910+00:00

    const newToken = createToken(user.username);
    req.session.token = newToken;

    return res.status(200).json({
        message : 'login success',
        username : user.username
    })
}

export async function httpLogoutUser(req, res) {
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