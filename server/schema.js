const { ApolloServer, gql } = require("apollo-server-express");
const db = require("./database");
const categories = db.get("categories");
const axios = require("axios");

const typeDefs = gql`
    type Query {
        name: String
    }
`;

const resolvers = {
    Query: {
        name: () => "dan"
    }
}

module.exports = { typeDefs, resolvers };