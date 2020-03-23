import React from 'react';
import {
  AppBar, Toolbar, Typography
} from '@material-ui/core';
import './TopBar.css';
import axios from 'axios';


/**
 * Define TopBar, a React componment of CS142 project #5
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    // this.state = ({ });
  }

  render() {
    return (
      <AppBar className="cs142-topbar-appBar" position="absolute">
        <Toolbar>
          <Typography variant="h5" color="inherit">
            FindATime
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;
