const express = require('express');
const {graphqlHTTP} = require('express-graphql')
const schema = require('../schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3005;

mongoose.connect('mongodb+srv://ddkanischev:Pass123@cluster0.iwcdzve.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, dbName: 'graphql'})

app.use(cors())                 //First request

app.use('/graphql', graphqlHTTP({           //Second request
    schema,
    graphiql: true
}));

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection error ${err}`));
dbConnection.once('open', () => console.log('Connected to DB'))

app.listen(PORT, err => {
    err ? console.log(err) : console.log('Server started!')
})
