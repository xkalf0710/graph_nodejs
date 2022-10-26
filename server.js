const path = require('path');
const express = require('express');

const {buildSchema } = require('graphql');
const {graphqlHTTP} = require('express-graphql');

const {ApolloServer} = require('apollo-server-express');

const {loadFilesSync} = require('@graphql-tools/load-files');

const {makeExecutableSchema} = require('@graphql-tools/schema');


const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'));
const resolcersArray = loadFilesSync(path.join(__dirname, '**/*.resolvers.js'));


async function startApolloServer(){
  const app = express();
  const schema = makeExecutableSchema({
    typeDefs: typesArray, 
    resolvers: resolcersArray,
});

const server = new ApolloServer({
    schema: schema
});

await server.start();
server.applyMiddleware({app, path: '/graphql' });


app.listen(3000, ()=> {
    console.log("running graphql server")
   });
}

startApolloServer();
