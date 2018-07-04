const express = require('express')
const graphql = require('graphql')
const app = express()
const cors = require('cors');

app.get('/', (req, res) => res.send("Hello world !"))
// run server on port 3000
app.listen('3000', _ => console.log('Server is listening on port 3000…'))

const graphqlHTTP = require('express-graphql')
const schema = require('./graphql/schema/Schema')

app.use('/graphql', cors(), graphqlHTTP({
  schema,
  graphiql: true
}))
