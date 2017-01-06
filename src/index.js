import React from 'react';
import ReactDOM from 'react-dom';
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
const appState = observable({
  count: 0,
  searchText: '',
  userData: {},
  mrUser: []
});

class App extends React.Component{
  render(){
    return (
      <MuiThemeProvider>
        <Counter appState={this.props.appState} />
      </MuiThemeProvider>
    );
  }
}

//const t = new Temperature();

ReactDOM.render(
  <App appState={appState} />
  , document.getElementById('app'));
