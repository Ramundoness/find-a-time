import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter, Route, Switch, Link
} from 'react-router-dom';
import {
    Grid, Paper, Typography, TextField, Button
} from '@material-ui/core';
import './Event.css';
import EventDetails from '../EventDetails/EventDetails';


// import necessary components
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

class Event extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date(), eventName: '', eventLocation: '', eventNote: '', eventID: '' };
    }

    componentDidMount() {
        if (this.state.eventID === '') {
            this.setState({ eventID: this.generateRandID() });
        }
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

    generateRandID = () => {
        var id = "";
        var validChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var validCharsLen = validChars.length;
        for (var i = 0; i < 12; i++) {
            id += validChars.charAt(Math.floor(Math.random() * validCharsLen));
        }
        this.setState({ eventID: id });
        this.props.setEventID(id);
        return id;
    }

    handleSubmit = (event) => {
        var self = this;
        var eventID = this.generateRandID();
        var url = "/newEvent/" + eventID;
        console.log('printed', this.state.eventName, this.state.eventLocation);
        axios.post(url, {
            event_name: self.state.eventName,
            event_loc: self.state.eventLocation,
            event_note: self.state.event,
            // event_id: eventID
        }).then(function (success) {
            var event = success.data;
            console.log('created event!');
        }, function (error) {
            // alert(error.response.data);
            console.log("Error in userIsLoggedIn in photoShare.jsx: " + error.response);
        });
    }

    render() {
        return (
            <div>
                <Typography variant="h6"> New Event Details: </Typography>
                <br />
                <form noValidate autoComplete="off">
                    <TextField id="event_name" className="input-event" label="Event Name" variant="outlined" value={this.state.eventName} onChange={this.handleEventNameChange} />
                    <TextField id="location" className="input-event" label="Location" variant="outlined" value={this.state.eventLocation} onChange={this.handleEventLocationChange} />
                    <TextField id="note" className="input-event" label="Note" variant="outlined" value={this.state.eventNote} onChange={this.handleEventNoteChange} />
                </form>
                <br />

                {/* <Button variant="contained" color="primary" component="a" href={"/event/" + this.state.eventID} onClick={this.handleSubmit}> */}
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
