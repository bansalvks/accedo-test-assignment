global.appPath = __dirname + '/';

var express = require('express');
var app = express();

var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

app.use(bodyParser());
app.use(cookieParser());

app.use("/api", require('./controllers'))

app.listen(7777, function () {
    console.log('Accedo is running on 7777...')
})