import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import { createServer } from 'http';
import schema from './schema/index';
import expressPlayGround from 'graphql-playground-middleware-express';

const app = express();
const port = 5301;
const httpServer = createServer(app);

app.use('*', cors());
app.use(compression());

const server = new ApolloServer({
    schema,
    introspection: true
});

server.applyMiddleware({ app });

app.get('/', expressPlayGround({
    endpoint: '/graphql'
}));
httpServer.listen({ port }, () => console.log(`Running: http://localhost:${port}`));