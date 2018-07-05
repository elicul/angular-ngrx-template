const express = require("express");
const mongoose = require('./config/mongoose');
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const expressJwt = require('express-jwt')
const jwt = require('jsonwebtoken');

const db = mongoose();
const app = express();

app.use('*', cors());

const authMiddleware = expressJwt({
  secret: 'somesuperdupersecret'
});

app.get('/auth', function(req, res) {
  res.json({
    jwt: jwt.sign({
        id: 1,
      }, 
      'somesuperdupersecret',
      { expiresIn: 60*60 })
  });
});

app.use(authMiddleware);

const userSchema = require('./graphql/index').userSchema;
app.use('/api', cors(), graphqlHTTP({
  schema: userSchema,
  rootValue: global,
  graphiql: true
}));

// Up and Running
app.listen(process.env.PORT || 8090, () => {
  console.log('A GraphQL API running at port 8090');
});