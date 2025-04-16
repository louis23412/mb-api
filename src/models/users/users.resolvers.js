import { registerUser, loginUser, logoutUser, getCurrencies } from './users.model.js';
import { tokenValidation } from '../../utils/tokens.js';

export default {
    Query : {
        logoutUser : (_, __, { req }) => {
            return logoutUser(req)
        },

        getCurrencies : async (_, { username }, { req, res }) => {
            const isValidated = tokenValidation(req, res, username)
            return isValidated ? getCurrencies(username) : undefined
        }
    },

    Mutation : {
        registerUser : async (_, { username, email, password }, { req }) => {
            return await registerUser(username, email, password, req )
        },

        loginUser : async (_, { email, password }, { req }) => {
            return await loginUser(email, password, req)
        }
    }
}