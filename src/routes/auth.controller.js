import { createToken } from "../utils/tokens.js";

export function httpRegisterUser(req, res) {
    const { username, password, email } = req.body;

    // TODO: Validate username, password, email here
    if (!username || !password || !email) {
        return res.status(400).json({
            error : 'missing user data'
        })
    }

    // TODO: Check if user exists in database here, res.send error if user already exists

    // TODO: Register user in database here
    // TODO: Bcrypt password

    // Generate new JWT token here
    const newToken = createToken(email);

    // Set new token in req.session (cookies session) here
    req.session.token = newToken;

    // TODO: res.json confirmation of registration here

    return res.status(501).json({
        message : "Route in development"
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