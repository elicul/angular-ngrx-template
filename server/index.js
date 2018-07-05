const express = require("express");
const mongoose = require('./config/mongoose');
const graphqlHTTP = require("express-graphql");
const cors = require("cors");

const db = mongoose();
const app = express();

app.use('*', cors());

const userSchema = require('./graphql/index').userSchema;
app.use('/graphql', cors(), graphqlHTTP({
  schema: userSchema,
  rootValue: global,
  graphiql: true
}));

// Up and Running
app.listen(process.env.PORT || 8090, () => {
  console.log('A GraphQL API running at port 8090');
});