import usersDatabase from './users.mongo.js';

function generateId(username) {
    const result = Math.random().toString(32).replace('0.', `${username}-`)
    return result;
}

function generatePlanet(username, date) {
    return {
        planetId : `planet-${generateId(username)}`,

        lastUpdate : date,

        resources : {
            oxygen : 10000,

            helium : 7500,

            iron : 5000,

            crystal : 5000
        },

        buildings : {
            commandCenter : {
                lvl : 1
            },

            shipyard : { 
                lvl : 1
            }
        }
    }
}

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
        console.log(err)
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
    const insertDate = new Date()
    const newPlanet = generatePlanet(username, insertDate)

    try {
        const registerResponse = await usersDatabase.insertOne({
            lastLogin : insertDate,

            username,
            email,
            hash,

            defaultPlanet : newPlanet.planetId,

            planets : [ newPlanet ]
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