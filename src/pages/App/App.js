import React, { Component } from 'react';
import getRoutes from '../routes';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

class App extends Component {
  render() {
    return (
      <div>
        {getRoutes()}
      </div>
    );
  }
}

export default App;