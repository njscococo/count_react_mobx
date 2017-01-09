import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router';

import { observer } from 'mobx-react';
import { observable, computed, action } from 'mobx';
import DevTools from 'mobx-react-devtools';
import axios from 'axios';

//material-ui
//import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

//import Temperature from './index_temperature';

import Counter from './components/counter';

//injectTapEventPlugin();


class App extends React.Component{
  render(){
    return (
      <MuiThemeProvider>      
        <Counter  />
      </MuiThemeProvider>
    );
  }
}

//const t = new Temperature();

ReactDOM.render(
  <App  />  
  , document.getElementById('app'));
