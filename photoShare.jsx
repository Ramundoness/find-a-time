import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter, Route, Switch
} from 'react-router-dom';
import {
  Grid, Paper, Typography, TextField, Button
} from '@material-ui/core';
import './styles/main.css';

// import necessary components
import TopBar from './components/topBar/TopBar';
import Event from './components/event/Event';
import Calendar from './components/calendar/Calendar';
import EventDetails from './components/EventDetails/EventDetails';

class PhotoShare extends React.Component {
  constructor(props) {
    super(props);
    this.state = { eventID: '' };
  }

  setEventID = (id) => {
    this.setState({ eventID: id });
    console.log('lsettt', id);
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <TopBar />
            </Grid>
            <div className="cs142-main-topbar-buffer" />

            <Grid item sm={6}>
              <Paper className="cs142-main-grid-item">
                <Switch>

                  <Route path="/"
                    component={Calendar}

                  />
                </Switch>
              </Paper>
            </Grid>
            <Grid item sm={6}>
              <Paper className="cs142-main-grid-item">
                {/* <Route path="/event/:event_id"
                    component={EventDetails}
                  /> */}
                <Switch>
                  <Route path="/"
                    render={props => <Event setEventID={this.setEventID} />}
                  />

                  <Route path="/event/:event_id"
                    render={props => <EventDetails {...props} eID={this.state.eventID} />}
                  />
                </Switch>

              </Paper>
            </Grid>

          </Grid>
        </div>
      </HashRouter>
    );
  }
}


ReactDOM.render(
  <PhotoShare />,
  document.getElementById('photoshareapp'),
);
