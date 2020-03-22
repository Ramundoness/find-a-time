"use strict";
/*
 *  Defined the Mongoose Schema and return a Model for a User
 */
/* jshint node: true */

var mongoose = require('mongoose');

var eventUserSchema = new mongoose.Schema({
    date_time: {type: Date, default: Date.now}, // The date and time when the comment was created.
    dateTimeRanges: []
});

// create a schema
var eventSchema = new mongoose.Schema({
    name: String, // First name of the user.
    participants: [eventUserSchema],
    location: String,
    note: String, default: "",
    eventID: String,
    date_time: Date
});

// the schema is useless so far
// we need to create a model using it
var Event = mongoose.model('Event', eventSchema);

// make this available to our users in our Node applications
module.exports = Event;
