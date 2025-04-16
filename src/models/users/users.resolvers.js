import { getCurrencies, registerUser, loginUser, updateCurrencies, logoutUser } from './users.model.js';
import { tokenValidation } from '../../utils/tokens.js';

export default {
    Query : {
        logoutUser : (_, __, { req, res }) => {
            return logoutUser(req, res)
        },

        getCurrencies : async (_, { username }, { req, res }) => {
            const isValidated = tokenValidation(req, res, username)
            return isValidated ? getCurrencies(username) : undefined
        }
    },

    Mutation : {
        registerUser : async (_, { username, email, password }, { req, res }) => {
            return await registerUser(username, email, password, req, res)
        },

        loginUser : async (_, { email, password }, { req, res }) => {
            return await loginUser(email, password, req, res)
        },

        updateCurrencies : async (_, { username, credits, darkMatter }, { req, res }) => {
            const isValidated = tokenValidation(req, res, username)
            return isValidated ? updateCurrencies(username, credits, darkMatter) : undefined
        }
    }
}