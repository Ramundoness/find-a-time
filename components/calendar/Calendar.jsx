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
        this.props.changeDateSelected(value);
    }

    render() {
        return (
            <div className="calendar">
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
