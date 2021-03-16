const {ApolloServer, PubSub} = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');
const {MONGODB} = require('./config');

const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req})=>({req})        //forward req to the context
});

mongoose.connect(MONGODB,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log('MongoDb connected');
   return server.listen({port:4000});
})
.then((res)=>{
    console.log(`Server running at ${res.url}`);
});
