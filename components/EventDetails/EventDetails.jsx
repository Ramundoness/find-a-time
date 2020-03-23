import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter, Route, Switch
} from 'react-router-dom';
import {
    Grid, Paper, Typography, TextField, Button
} from '@material-ui/core';

// import necessary components
import './EventDetails.css';
import axios from 'axios';

class EventDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = { events: [], currEvent: [], userName: '', showCalendar: false, simpleDate: '' };
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.retrieveModel(params.event_id);
    }

    retrieveModel(stuff) {
        console.log('in retrieve');
        var self = this;
        // var url = "/event/" + this.props.eID;
        var url = "/event/" + stuff;
        console.log('url', url, this.props.event_id, stuff);
        axios.get(url).then(function (success) {
            console.log('success data', success.data[0]);
            self.setState({ currEvent: success.data[0] });
            console.log('the vals are', self.state.currEvent);
            self.setSimpleDate();

        }), function (error) {
            console.log("Error in retrieveModel in userList.jsx: " + error);
        }
    }

    setSimpleDate = () => {
        var currDate = this.state.currEvent.date_time;
        var newDate = new Date(currDate);
        var ret = `${newDate.getMonth() + 1}/${newDate.getDate()}`
        this.setState({ simpleDate: ret });
    }

    handleUserChange = (event) => {
        this.setState({ userName: event.target.value });
    }

    handleSubmit = (event) => {
        this.setState({ showCalendar: true });
    }

    clickedDown = (event) => {
        console.log('clicked down')
        var currColor = document.getElementById(event.target.id).style.backgroundColor;
        if (currColor === "green") {
            document.getElementById(event.target.id).style.backgroundColor = "red";
            console.log('curr', currColor)
        } else {
            document.getElementById(event.target.id).style.backgroundColor = "green";
            console.log('curr', currColor)
        }
    }

    mouseMoved = (event) => {
        var items = document.getElementsByClassName("grid-item");
        var id = event.target.id;
        var firstClicked = false;
        var toSetColor = '';
        var prev = -1;
        for (var i = 0; i < items.length; i++) (function (i) {
            items[i].onmousemove = function (e) {
                if (e.buttons == 1) {
                    console.log(i);
                    if (!firstClicked) {
                        var currColor = document.getElementById(id).style.backgroundColor;
                        if (currColor === "green") {
                            toSetColor = "red";
                        } else {
                            document.getElementById(id).style.backgroundColor = "green";
                            toSetColor = "green";
                        }
                        firstClicked = true;
                    }
                    items[i].style.backgroundColor = toSetColor;
                }
            }
        })(i);
    }

    render() {
        return (
            <div>
                <div className="event-details">
                    <Typography variant="h5">{this.state.currEvent.name}</Typography>
                    <Typography variant="subtitle1">{this.state.currEvent.location}</Typography>
                    <Typography variant="subtitle1">{this.state.currEvent.note}</Typography>
                    <form noValidate autoComplete="off">
                        <TextField id="username" label="Username" variant="outlined" style={{ width: "500px" }} value={this.state.userName} onChange={this.handleUserChange} />
                        <br /> <br />
                        <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                            Submit
                        </Button>
                        <br /> <br />

                    </form>
                </div>
                {this.state.showCalendar
                    ?
                    <div className="grid-with-labels">
                        <div className="labels">
                            <div className="label"></div>
                            <div className="label">9 AM</div>
                            <div className="label">10 AM</div>
                            <div className="label">11 AM</div>
                            <div className="label">12 PM</div>
                            <div className="label">1 PM</div>
                            <div className="label">2 PM</div>
                            <div className="label">3 PM</div>
                            <div className="label">4 PM</div>
                            <div className="label">5 PM</div>
                        </div>
                        <div className="grid">
                            <Typography variant="subtitle1" style={{ textAlign: "center" }}>{this.state.simpleDate}</Typography>

                            <div className="grid-item" id="9am" onMouseDown={this.mouseMoved} onMouseMove={this.mouseMoved}></div>
                            <div className="grid-item" id="10am" onMouseDown={this.clickedDown} onMouseMove={this.mouseMoved}></div>
                            <div className="grid-item" id="11am" onMouseDown={this.clickedDown} onMouseMove={this.mouseMoved}></div>
                            <div className="grid-item" id="12am" onMouseDown={this.clickedDown} onMouseMove={this.mouseMoved}></div>
                            <div className="grid-item" id="1pm" onMouseDown={this.clickedDown} onMouseMove={this.mouseMoved}></div>
                            <div className="grid-item" id="2pm" onMouseDown={this.clickedDown} onMouseMove={this.mouseMoved}></div>
                            <div className="grid-item" id="3pm" onMouseDown={this.clickedDown} onMouseMove={this.mouseMoved}></div>
                            <div className="grid-item" id="4pm" onMouseDown={this.clickedDown} onMouseMove={this.mouseMoved}></div>
                            <div className="grid-item" id="5pm" onMouseDown={this.clickedDown} onMouseMove={this.mouseMoved}></div>
                        </div>
                    </div>
                    :
                    <div></div>



                }


            </div>
        );
    }
}

export default EventDetails;
