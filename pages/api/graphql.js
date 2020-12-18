import { ApolloServer, gql } from "apollo-server-micro";
import { makeExecutableSchema } from "graphql-tools";
import { MongoClient } from "mongodb";

require("dotenv").config();

const typeDefs = gql`
    type Category {
        id: ID!
        name: String
    }

    type Query {
        categories: [Category]!
    }
`;

const resolvers = {
    Query: {
        categories: async (_parent, _args, _context, _info) => {
            const res = await _context.db
                .collection("categories")
                .find({})
                .toArray();
            return res.map(cat => ({ ...cat, id: cat._id }));
        },
    },
};

let db;

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const apolloServer = new ApolloServer({
    schema,
    context: async () => {
        if (!db) {
            try {
                const dbClient = new MongoClient(process.env.MONGO_URL, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                });

                if (!dbClient.isConnected()) await dbClient.connect();
                db = dbClient.db("snacket");
            } catch (e) {
                console.error(
                    e,
                    "---> Error while connecting with snacket (db)"
                );
            }
        }
        return { db };
    },
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
