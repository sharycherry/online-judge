var express = require('express')
var path = require('path');
var restRouter = require('./routes/rest');
// var indexRouter = require('./routes/index');
var mongoose = require("mongoose");
var app = express()

mongoose.connect('mongodb://user:user@ds117316.mlab.com:17316/soj');

app.use('/api/v1', restRouter);
// app.use('/', indexRouter);


app.listen(3000, function () {
    console.log('App listening on port 3000!');
})



