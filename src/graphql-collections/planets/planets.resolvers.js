import { occupyPlanet, viewPlanet } from './planets.handlers.js';

import { tokenValidation } from '../../utils/tokens.js';

export default {
    Query : {
        viewPlanet : async (_, { username, planetId }, { req, res }) => {
            const isValidated = tokenValidation(req, res, username)
            return isValidated ? viewPlanet(username, planetId) : undefined
        }
    },

    Mutation : {
        occupyPlanet : async (_, { username, planetName }, { req, res }) => {
            const isValidated = tokenValidation(req, res, username)
            return isValidated ? occupyPlanet(username, planetName) : undefined
        }
    }
}