import { createToken } from "../utils/tokens.js";

import { findUser, registerUser } from "../models/launches.model.js";

export async function httpRegisterUser(req, res) {
    const { username, password, email } = req.body;

    // TODO: Validate username, password, email here
    if (!username || !password || !email) {
        return res.status(400).json({
            error : 'missing user data'
        })
    }

    const userExists = await findUser(username, email);

    if (userExists) {
        return res.status(409).json({
            error : 'username or email already registered'
        })
    }

    // TODO: Bcrypt password
    const hash = password
    const registered = await registerUser(username, email, hash);

    if (!registered) {
        return res.status(500).json({
            error : 'user registration failed'
        })
    }

    const newToken = createToken(email);
    req.session.token = newToken;

    return res.status(200).json({
        message : "new user registered"
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