import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

export function createToken(id) {
    const payload = {
        exp: Math.floor(Date.now() / 1000) + ((60 * 60) * 24),
        id
    }

    const token = jwt.sign(payload, JWT_SECRET_KEY);

    return token;
}

export function checkToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        return decoded.id
    } catch(err) {
        return false
    }
}
















export function refreshToken(token) {
    // extend token life
    // return new token
}

function destroyToken() {
    // destroy token here
    // maybe return something?
}