const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
require("dotenv").config();

const schema = require("./schema/schema");

const app = express();

mongoose.connect(
  `mongodb://${process.env.DB_USER}:${
    process.env.DB_PASS
  }@ds157639.mlab.com:57639/reading-list`
);

mongoose.connection.once("open", () => {
  console.log("connected to database");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(8000, () => {
  console.log("now listening for reqests on port 8000");
});
