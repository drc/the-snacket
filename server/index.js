const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const slowDown = require("express-slow-down");
const { ApolloServer, gql } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schema");

const app = express();

// Rate Limiting
// app.enable("trust proxy");

const speedLimiter = slowDown({
    windowMs: 5 * 60 * 1000,
    delayAfter: 10,
    delayMs: 500,
    maxDelayMs: 10000,
});

// Middleware

app.use(speedLimiter);
app.use(morgan("dev"));
app.use(cors());

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.applyMiddleware({ app, path: "/graphql" });

if (process.env.NODE_ENV === "production") {
    // static folder
    app.use(express.static(path.join(__dirname, "..", "/client/build/")));

    app.get(/.*/, (req, res) =>
        res.sendFile(path.join(__dirname, "..", "/client/build/index.html"))
    );
}

// error handling stuff
app.use((req, res, next) => {
    res.status(404);
    const error = new Error(`🔎 - Not Found - ${req.originalUrl}`);
    next(error);
});

app.use((err, req, res, next) => {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
    });
});

// server stuff

const port = process.env.PORT || 5000;

app.listen(port, () =>
    console.log(
        `Server started at http://localhost:${port}${server.graphqlPath}`
    )
);
