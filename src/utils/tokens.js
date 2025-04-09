import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

export function createToken(email) {
    const payload = {
        exp: Math.floor(Date.now() / 1000) + (60 * 60),

        data : {
            email
        }
    }

    const token = jwt.sign(payload, JWT_SECRET_KEY);

    return token;
}

export function refreshToken(token) {
    // extend token life
    // return new token
}

export function checkToken(token) {
    // Check if JWT is valid
    // const decoded = jwt.verify(token, JWT_SECRET_KEY);

    let decoded;

    try {
        decoded = jwt.verify(token, JWT_SECRET_KEY);
    } catch(err) {
        return false
    }

    if (decoded) {
        // check date here

        return true
    }

    // return false if valid token
    // return true if valid token
}






function destroyToken() {
    // destroy token here
    // maybe return something?
}