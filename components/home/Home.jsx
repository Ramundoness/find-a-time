import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter, Route, Switch, Link
} from 'react-router-dom';
import {
    Grid, Paper, Typography, TextField, Button
} from '@material-ui/core';

// import necessary components
import './Home.css';
import axios from 'axios';

class Home extends React.Component {
    constructor(props) {
        super(props);
        // this.state = { events: [] };
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps) {

    }

    render() {
        return (
            <div>
                <Typography variant="h3" className="home-page-text">FindATime</Typography>
                <Typography variant="h4" className="home-page-text">A tool to find an ideal time to meet</Typography>
                <Link to={"/newEvent"}>
                    <div style={{ justifyContent: "center", display: "flex" }}>
                        <Button variant="contained" color="primary">
                            Create an event
                    </Button>
                    </div>
                </Link>
            </div>
        );
    }
}

export default Home;
