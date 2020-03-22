import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter, Route, Switch
} from 'react-router-dom';
import {
    Grid, Paper, Typography, TextField, Button
} from '@material-ui/core';
import './Calendar.css';

// import necessary components
import Cal from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }

    calOnChange = (value) => {
        console.log(value);
        this.setState({ date: value })
    }

    render() {
        return (
            <div>
                <Typography variant="h6"> Choose a meeting date or range of meeting dates! </Typography>
                <br />
                <Cal
                    onChange={this.calOnChange}
                    value={this.state.date}
                />
            </div>
        );
    }
}

export default Calendar;
