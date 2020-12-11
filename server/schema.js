const { ApolloServer, gql } = require("apollo-server-express");
const db = require("./database");
const categories = db.get("categories");
const axios = require("axios");

const typeDefs = gql`
    type Query {
        
    }

    type Mutation {
        
    }
`;

const resolvers = {
    Query: {
        
    },
    Mutation: {
        
    }
}

module.exports = { typeDefs, resolvers };