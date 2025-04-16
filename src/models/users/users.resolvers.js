import { getCurrencies, registerUser, loginUser, updateCurrencies } from './users.model.js';
import { tokenValidation } from '../../utils/tokens.js';

export default {
    Query : {
        getCurrencies : (_, { username }, { req, res }) => {
            const isValidated = tokenValidation(req, res, username)
            return isValidated ? getCurrencies(username) : undefined
        }
    },

    Mutation : {
        registerUser : async (_, args, { req, res }) => {
            return await registerUser(args.username, args.email, args.password, req, res)
        },

        loginUser : async (_, args, { req, res }) => {
            return await loginUser(args.email, args.password, req, res)
        },

        logoutUser : (_, args, { req, res }) => {
            
        },

        updateCurrencies : (_, { username, credits, darkMatter }, { req, res }) => {
            const isValidated = tokenValidation(req, res, username)
            return isValidated ? updateCurrencies(username, credits, darkMatter) : undefined
        }
    }
}