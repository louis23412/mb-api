import usersDatabase from './launches.mongo.js';

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

export async function registerUser(username, email, hash) {
    try {
        await usersDatabase.insertOne({
            username,
            email,
            hash
        })

        return true;
    } catch (err) {
        return false;
    }
}