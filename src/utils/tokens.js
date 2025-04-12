import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

function calcExpiration(iat, exp) {
    const timeIssued = new Date(iat * 1000)
    const expireTime = new Date(exp * 1000)

    console.log((expireTime - timeIssued) / 1000 / 60)
}

export function createToken(username) {
    const payload = {
        exp: Math.floor(Date.now() / 1000) + (60 * process.env.SESSION_EXPIRATION_MINUTES),
        username
    }

    const token = jwt.sign(payload, JWT_SECRET_KEY);
    return token;
}

export function checkToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        // calcExpiration(decoded.iat, decoded.exp)
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