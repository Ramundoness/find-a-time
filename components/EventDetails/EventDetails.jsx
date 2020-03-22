import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter, Route, Switch
} from 'react-router-dom';
import {
    Grid, Paper, Typography, TextField, Button
} from '@material-ui/core';

// import necessary components
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

class EventDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = { events: [] };
    }

    componentDidMount() {
        this.retrieveModel();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.events !== prevProps.match.params.events) {
          this.retrieveModel();
        }
      }

    retrieveModel() {
        console.log('in retrieve');
        var self = this;
        var url = "/event/" + this.props.eID;
        console.log('url', url);
        axios.get(url).then(function (success) {
            console.log(success.data);
            if (self.state.events !== success.data) {
                self.setState({ events: success.data });
            }
        }), function (error) {
            console.log("Error in retrieveModel in userList.jsx: " + error);
        }
    }

    render() {
        return (
            <div>
                <Typography>{this.props.eID}</Typography>
                {/* {this.state.events} */}
            </div>
        );
    }
}

export default EventDetails;
