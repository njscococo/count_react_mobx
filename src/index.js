import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory } from 'react-router';

import { observer } from 'mobx-react';
import { observable, computed, action } from 'mobx';
import DevTools from 'mobx-react-devtools';
import axios from 'axios';

//material-ui
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

//import Temperature from './index_temperature';

//import Counter from './components/counter';
import GithubUser from './components/github';
import MRUser from './components/mr';

injectTapEventPlugin();


class App extends React.Component {
  render() {
    return (
      <div>
        <h1>React Router </h1>
        <ul role="nav">
          <li><Link to="/GithubUser">GithubUser</Link></li>
          <li><Link to="/MRUser">MRUser</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}

//const t = new Temperature();

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} >
      <Route path="/GithubUser" component={GithubUser} />
      <Route path="/MRUser" component={MRUser} />
    </Route>
  </Router>
  , document.getElementById('app'));
