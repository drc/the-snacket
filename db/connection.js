const monk = require("monk");
require("dotenv").config();

const db = monk(process.env.MONGO_URL);

module.exports = db;