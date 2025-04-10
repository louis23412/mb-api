import validator from "validator";

import { createToken } from "../utils/tokens.js";
import { hashPass, compareHash } from "../utils/hash.js";
import { findUser, registerUser } from "../models/launches.model.js";

export async function httpRegisterUser(req, res) {
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

export function httpLoginUser(req, res) {
    return res.status(501).json({
        message : "Route in development"
    })
}

export function httpLogoutUser(req, res) {
    return res.status(501).json({
        message : "Route in development"
    })
}