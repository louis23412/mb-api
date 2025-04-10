import usersDatabase from './launches.mongo.js';

function generateId(username) {
    const result = Math.random().toString(32).replace('0.', `${username}-`)

    return result;
}

export async function findUser(username, email) {
    try {
        const answer = await usersDatabase.findOne({
            $or : [{ username }, { email } ]
        })

        if (answer) {
            return true
        }

        return false

    } catch (err) {
        return false
    }
}

export async function returnUser(email) {
    try {
        const answer = await usersDatabase.findOne({
            email
        },
        {
            _id : 0,
            username : 0,
            __v : 0
        })

        if (answer) {
            return answer
        }

        return false
    } catch (err) {
        return false
    }
}

export async function registerUser(username, email, hash) {
    const newId = generateId(username)

    try {
        await usersDatabase.insertOne({
            userId : newId,
            username,
            email,
            hash
        })

        return newId;
    } catch (err) {
        return false;
    }
}