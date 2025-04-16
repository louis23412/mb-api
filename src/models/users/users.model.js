import usersDatabase from './users.mongo.js';

// function generateId(username) {
//     const result = Math.random().toString(32).replace('0.', `${username}-`)
//     return result;
// }

export async function findUser(username, email) {
    try {
        const answer = await usersDatabase.findOne({
            $or : [{ username }, { email } ]
        }, {
            currencies : 0,
            username : 0,
            email : 0,
            hash : 0,
            totalPlanets : 0,
            defaultPlanet : 0,
            planets : 0,
            __v : 0
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
            lastLogin : 0,
            email : 0,
            totalPlanets : 0,
            defaultPlanet : 0,
            planets : 0,
            currencies : 0,
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
    try {
        const registerResponse = await usersDatabase.insertOne({
            lastLogin : new Date(),
            username,
            email,
            hash,
        })

        if (registerResponse._id) {
            return true;
        }

        return false
    } catch (err) {
        return false;
    }
}

export async function updateLoginTime(username, date) {
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

//---------

const tempCurrencyObject = {
    credits : 1000,
    darkMatter : 100
}

export async function getCurrencies(username) {
    return tempCurrencyObject;
}

export async function updateCurrencies(username, credits, darkMatter) {
    credits ? tempCurrencyObject.credits += credits : false
    darkMatter ? tempCurrencyObject.darkMatter += darkMatter : false

    return tempCurrencyObject;
}