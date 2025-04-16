import { Router }  from 'express';

import { createYoga } from 'graphql-yoga';

import { loadFilesSync}   from '@graphql-tools/load-files';
import { makeExecutableSchema } from '@graphql-tools/schema';

const graphqlRoute = Router();

const schema = makeExecutableSchema({
    typeDefs : loadFilesSync('**/*', { extensions: ['graphql'] }),
    resolvers : loadFilesSync('**/*', { extensions: ['resolvers.js'] })
})

graphqlRoute.get('/', (req, res) => { // Disable GET requests to /graphql
    res.status(405).json({
        error : 'not allowed'
    })
})

graphqlRoute.use('/', createYoga({
    schema : schema
}));

export default graphqlRoute;