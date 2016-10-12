'use strict';

var express = require('express');
var mongo = require('mongodb');
var path = require("path");
var routes = require('./app/routes/index.js');

var app = express();

require('dotenv').config()

var url = process.env.MONGODB || 'mongodb://localhost:27017/clementinejs';
var port = process.env.PORT || 3000;

app.set('app_url', process.env.APP_URL);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

mongo.connect(url, function (err, db) {

   if (err) {
      throw new Error('Database failed to connect!');
   } else {
      console.log('Successfully connected to ' + url);
   }

   app.use('/public', express.static(process.cwd() + '/public'));
   app.use('/controllers', express.static(process.cwd() + '/app/controllers'));

   routes(app, db);

   app.listen(port, function () {
      console.log('Node.js listening on port ' + port);
   });

});
