const express = require('express')
const expressGraphQL = require('express-graphql')
const cors = require('cors');
const schema = require('./graphql/schema/Schema')

const app = express();

app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}))
