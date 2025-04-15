import { Router }  from 'express';

import { tokenMiddle } from '../../utils/tokens.js';

import { createYoga } from 'graphql-yoga';

import { loadFilesSync}   from '@graphql-tools/load-files';
import { makeExecutableSchema } from '@graphql-tools/schema';

const graphqlRoute = Router();

const schema = makeExecutableSchema({
    typeDefs : loadFilesSync('**/*', { extensions: ['graphql'] }),
    resolvers : loadFilesSync('**/*', { extensions: ['resolvers.js'] })
})

graphqlRoute.use(tokenMiddle);

graphqlRoute.use('/', createYoga({
    schema : schema,
    graphiql : true
}));

export default graphqlRoute;