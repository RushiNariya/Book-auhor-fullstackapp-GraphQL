const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');
const app = express();

app.use(cors());

mongoose
  .connect(
    'mongodb+srv://adminritz:56FRf!VzM.$pb7J@cluster0.belip.mongodb.net/BookAuthor?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .catch((err) => {
    console.log(err);
  });
mongoose.connection.once('open', () => {
  console.log('connected');
});

mongoose.connection.on('error', (err) => {
  console.log(err);
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(8080, () => {
  console.log('listening...');
});
