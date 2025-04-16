import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

function calcExpiration(iat, exp) {
    const timeIssued = new Date(iat * 1000).getTime()
    const expireTime = new Date(exp * 1000).getTime()
    const tokenLife = (expireTime - timeIssued) / 1000 / 60
    const timeNow = new Date().getTime()
    const tokenRemainingLife = (expireTime - timeNow) / 1000 / 60
    const lifeRatio = (tokenRemainingLife / tokenLife) * 100

    if (lifeRatio <= 10) {
        return true // Return true if token lifetime <= 10% remaining
    }

    return false
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
        const shouldExtend = calcExpiration(decoded.iat, decoded.exp);

        return {
            username : decoded.username,
            extend : shouldExtend
        }
    } catch(err) {
        return false
    }
}

export function tokenValidation(req, res, username) {
    if (req.session.token) {
        const isValidToken = checkToken(req.session.token);

        if (!isValidToken) {
            res.status(401).json({
                error : 'access denied'
            })

            return false;
        }

        if (isValidToken.username !== username) {
            res.status(403).json({
                error : 'access denied'
            })

            return false;
        }

        if (isValidToken.extend) {
            req.session.token = createToken(isValidToken.username)
        }

        return true
    }

    res.status(401).json({
        error : 'access denied'
    })

    return false;
}