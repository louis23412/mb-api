import { viewUserProfile } from './users.hadlers.js';

import { tokenValidation } from '../../utils/tokens.js';

export default {
    Query : {
        viewUserProfile : async (_, { username }, { req, res }) => {
            const isValidated = tokenValidation(req, res, username)
            return isValidated ? viewUserProfile(username) : undefined
        }
    }
}