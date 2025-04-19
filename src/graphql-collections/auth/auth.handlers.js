import validator from "validator";

import usersDatabase from '../../models/users.mongo.js';

import { hashPass, compareHash } from '../../utils/hash.js';
import { createToken, checkToken } from '../../utils/tokens.js';

async function findUser(username, email) {
    try {
        const answer = await usersDatabase.findOne({
            $or : [{ username }, { email } ]
        }, {
            defaultPlanet : 0,
            exp : 0,
            planetList : 0,
            totalPlanets : 0,
            currencies : 0,
            lastLogin : 0,
            username : 0,
            email : 0,
            hash : 0,
            __v : 0
        })

        if (answer._id) {
            return true
        }

        return false

    } catch (err) {
        return false
    }
}

async function returnUser(email) {
    try {
        const answer = await usersDatabase.findOne({
            email
        },
        {
            _id : 0,
            lastLogin : 0,
            email : 0,
            currencies : 0,
            __v : 0,
            defaultPlanet : 0,
            exp : 0,
            planetList : 0,
            totalPlanets : 0
        })

        if (answer) {
            return answer
        }

        return false
    } catch (err) {
        return false
    }
}

async function updateLoginTime(username, date) {
    try {
        const loginTimeUpdate = await usersDatabase.updateOne({
            username
        }, {
            $set : { lastLogin : date }
        })

        if (loginTimeUpdate.modifiedCount === 1) {
            return true
        }

        return false
    } catch(err) {
        return false
    }
}

export async function registerUser(username, email, password, req) {
    if (
        !validator.isEmail(email) || 
        !validator.isAlphanumeric(username) || username.length < 5  || username.length > 15 ||
        !validator.isStrongPassword(password)
    ) {
        return {
            status : false,
            message : 'invalid user data'
        };
    }

    const userExists = await findUser(username, email);

    if (userExists) {
        return {
            status : false,
            message : 'username or email already registered'
        };
    }

    const hash = await hashPass(password);
    const newToken = createToken(username);

    try {
        const registerResponse = await usersDatabase.findOneAndUpdate({
            username,
        }, 
        {
            lastLogin : new Date(),
            username,
            email,
            hash,
        }, 
        {
            upsert : true,
            new : true,
            projection : {
                hash : 0,
                currencies : 0,
                username : 0,
                __v : 0,
                email : 0,
                lastLogin : 0,
                defaultPlanet : 0,
                exp : 0,
                planetList : 0,
                totalPlanets : 0
            }
        })

        if (registerResponse._id) {
            req.session.token = newToken;

            return {
                status : true,
                message : 'registration success',
                username,
                email
            }
        }

        return {
            status : false,
            message : 'registration failed'
        }
    } catch (err) {
        return {
            status : false,
            message : 'registration failed'
        }
    }
}

export async function loginUser(email, password, req) {
    if (req.session.token) {
        const loggedInUsername = checkToken(req.session.token);

        if (loggedInUsername.username) {
            return {
                status : false,
                message : 'user already logged in',
                username : loggedInUsername.username
            };
        }
    }

    if ( email.length < 1 || password.length < 1) {
        return {
            status : false,
            message : 'invalid user data'
        };
    }

    const user = await returnUser(email);

    if (!user) {
        return {
            status : false,
            message : 'user not registered'
        };
    }

    const isValidPass = await compareHash(password, user.hash)

    if (!isValidPass) {
        return {
            status : false,
            message : 'invalid username or password',
        };
    }

    const loginUpdate = await updateLoginTime(user.username, new Date());

    if (!loginUpdate) {
        return {
            status : false,
            message : 'login failed'
        }
    }

    const newToken = createToken(user.username);
    req.session.token = newToken;

    return {
        status : true,
        message : 'login success',
        username : user.username
    };
}

export async function logoutUser(req) {
    if (req.session.token) {
        req.session = null

        return {
            status : true,
            message : 'logout success'
        };
    }

    return {
        status : false,
        message : 'not logged in'
    };
}