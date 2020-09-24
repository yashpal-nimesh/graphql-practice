const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

let DB_URL="mongodb+srv://yashpal:yashpal123@cluster0-3fmi1.mongodb.net/test?retryWrites=true&w=majority";
let local_url='mongodb://127.0.0.1:27017';

mongoose.connect(DB_URL, { useNewUrlParser: true })
mongoose.connection.once('open', () => {
  console.log("connected to database")
});

app.use(cors());


app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('app listen at port 4000')
});

