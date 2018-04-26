const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const schema = require("./schema/schema");

const app = express();

// Allow cross-origin requests
app.use(cors());

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
