import usersDatabase from '../../models/users.mongo.js';

import { calculateUserLevel } from '../../utils/calcLvl.js';

export async function viewUserProfile(username) {
    try {
        const answer = await usersDatabase.findOne({
            username
        },
        {
            hash : 0,
            defaultPlanet : 0,
            planetList : 0,
            totalPlanets : 0,
            __v : 0,
            _id : 0,
            email : 0,
            lastLogin : 0
        })

        if (answer.username) {
            return {
                status : true,
                profile : {
                    username,
                    lvl : calculateUserLevel(answer.exp),
                    currencies : answer.currencies
                }
            }
        }

        return {
            status : false,
            message : 'failed to find user'
        }
    } catch (err) {
        return {
            status : false,
            message : 'failed to fetch user'
        }
    }
}