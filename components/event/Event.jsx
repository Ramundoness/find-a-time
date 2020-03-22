import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter, Route, Switch, Link
} from 'react-router-dom';
import {
    Grid, Paper, Typography, TextField, Button
} from '@material-ui/core';
import './Event.css';
import Calendar from '../calendar/Calendar';
import axios from 'axios';

class Event extends React.Component {
    constructor(props) {
        super(props);
        this.generateRandID = this.generateRandID.bind(this);
        this.state = { date: new Date(), eventName: '', eventLocation: '', eventNote: '', eventID: this.generateRandID(), dateSelected: '' };
    }

    calOnChange = (value) => {
        console.log(value);
        this.setState({ date: value })
    }

    handleEventNameChange = (event) => {
        var text = event.target.value;
        this.setState({ eventName: text });
    }

    handleEventLocationChange = (event) => {
        var text = event.target.value;
        this.setState({ eventLocation: text });
    }

    handleEventNoteChange = (event) => {
        var text = event.target.value;
        this.setState({ eventNote: text });
    }

    changeDateSelected = (date) => {
        this.setState({ dateSelected: date });
    }

    generateRandID = () => {
        var id = "";
        var validChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var validCharsLen = validChars.length;
        for (var i = 0; i < 12; i++) {
            id += validChars.charAt(Math.floor(Math.random() * validCharsLen));
        }
        return id;
    }

    handleSubmit = (event) => {
        var self = this;
        var eventID = this.state.eventID;
        var url = "/newEvent/" + eventID;
        console.log('printed', this.state.eventName, this.state.eventLocation);
        this.props.setEventID(eventID);
        axios.post(url, {
            event_name: self.state.eventName,
            event_loc: self.state.eventLocation,
            event_note: self.state.event,
            event_date: self.state.dateSelected
            // event_id: eventID
        }).then(function (success) {
            var event = success.data;
            console.log('created event!');
            console.log('received', event);
        }, function (error) {
            // alert(error.response.data);
            console.log("Error in userIsLoggedIn in photoShare.jsx: " + error.response);
        });
    }

    render() {
        return (
            <div className="create-event-text">
                <Typography variant="h6"> New Event Details: </Typography>
                <br />
                <form noValidate autoComplete="off">
                    <TextField id="event_name" className="input-event" label="Event Name" variant="outlined" value={this.state.eventName} onChange={this.handleEventNameChange} />
                    <TextField id="location" className="input-event" label="Location" variant="outlined" value={this.state.eventLocation} onChange={this.handleEventLocationChange} />
                    <TextField id="note" className="input-event" label="Details" variant="outlined" value={this.state.eventNote} onChange={this.handleEventNoteChange} />
                </form>
                <br />
                <Typography variant="h6"> Choose a meeting date or range of meeting dates! </Typography>

                {/* <Button variant="contained" color="primary" component="a" href={"/event/" + this.state.eventID} onClick={this.handleSubmit}> */}
                <Calendar changeDateSelected={this.changeDateSelected}/>
                <Link to={"/event/" + this.state.eventID}>
                    <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                        Create
                    </Button>
                </Link>
            </div>
        );
    }
}

export default Event;
