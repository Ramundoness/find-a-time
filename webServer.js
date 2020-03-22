"use strict";

/* jshint node: true */

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var async = require('async');

var Event = require('./schema/event.js');

var express = require('express');
var app = express();

mongoose.connect('mongodb://localhost/cs142project6', { useNewUrlParser: true, useUnifiedTopology: true });

// We have the express static module (http://expressjs.com/en/starter/static-files.html) do all
// the work for us.
app.use(express.static(__dirname));

// var session = require('express-session');
var bodyParser = require('body-parser');
// app.use(session({secret: 'secretKey', resave: false, saveUninitialized: false}));
app.use(bodyParser.json());


app.get('/', function (request, response) {
    response.send('Simple web server of files from ' + __dirname);
});

/*
 * URL /user/list - Return all the User object.
 */
app.post('/newEvent/:event_id', function (request, response) {
    console.log(request.body);
    console.log(request.params.event_id);
    console.log('date', request.body.event_date);
    Event.create({ 
        name: request.body.event_name, 
        participants: [], 
        location: request.body.event_loc, 
        note: request.body.event_note, 
        eventID: request.params.event_id,
        date_time: request.body.event_date
    }, function (err, newEvent) {
        newEvent.save()
        response.status(200).send(newEvent);
        return;
    });
});

app.get('/event/:event_id', function (request, response) {
    Event.find({}, function (err, events) {
        response.status(200).send(JSON.parse(JSON.stringify(events)));
        return;
    });
});


var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});


