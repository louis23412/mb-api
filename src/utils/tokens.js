import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

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

export function tokenMiddle(req, res, next) {
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
}