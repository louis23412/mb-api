import { getCurrencies, updateCurrencies } from './users.model.js';
import { tokenValidation } from '../../utils/tokens.js';

export default {
    Query : {
        getCurrencies : (_, args, { req, res }) => {
            const isValidated = tokenValidation(req, res, args.username)

            if (isValidated) {
                return getCurrencies(args.username);
            }

            return;
        }
    },

    Mutation : {
        updateCurrencies : (_, args) => {
            return updateCurrencies(args.username, args.credits, args.darkMatter)
        }
    }
}