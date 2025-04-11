import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

// function calculateExpiration(exp) {
//     const today = new Date()
//     const expires = new Date(exp * 1000)
// }

export function createToken(username) {
    const payload = {
        exp: Math.floor(Date.now() / 1000) + ((60 * 60) * 24),
        username
    }

    const token = jwt.sign(payload, JWT_SECRET_KEY);
    return token;
}

export function checkToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        return decoded.username
    } catch(err) {
        return false
    }
}