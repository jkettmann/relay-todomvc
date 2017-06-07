import express from 'express';
import graphQLHTTP from 'express-graphql';

import corsMiddleware from './corsMiddleware';
import schema from './data/schema';

const PORT = 5000;

const graphQLServer = express();

graphQLServer.use(corsMiddleware);

graphQLServer.use(
  '/graphql',
  graphQLHTTP(() => ({
    graphiql: true,
    pretty: true,
    schema,
  })),
);

graphQLServer.listen(PORT, () =>
  console.log(`GraphQL Server is now running on http://localhost:${PORT}`),
);
