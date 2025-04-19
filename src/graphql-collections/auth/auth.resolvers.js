import { registerUser, loginUser, logoutUser } from './auth.handlers.js';

export default {
    Mutation : {
        registerUser : async (_, { username, email, password }, { req }) => {
            return await registerUser(username, email, password, req )
        },

        loginUser : async (_, { email, password }, { req }) => {
            return await loginUser(email, password, req)
        },

        logoutUser : (_, __, { req }) => {
            return logoutUser(req)
        },
    }
}