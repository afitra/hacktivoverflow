const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'slackOver';

// Create a new MongoClient
const client = new MongoClient(url, {
    useNewUrlParser: true
});
// const mailer = require('./helper/mailer',)
// const jobkorn = require('./helper/jobkorn', function () {

// })


const express = require('express'),
    app = express(),
    routerUser = require('./routes/user'),
    routerAnswer = require('./routes/answer'),
    routerQuestion = require('./routes/question'),
    port = 3000,
    cors = require('cors'),
    mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

mongoose.set('findAndUpdate', false)
mongoose.connect(`mongodb://localhost:27017/${dbName}`, {
    useNewUrlParser: true
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extends: false
}))

// app.use('/', router)
app.use('/user', routerUser)
app.use('/question', routerQuestion)
app.use('/answer', routerAnswer)
module.exports = app

app.listen(port, function () {
    console.log(`live on port ${port} ######*******`);
})