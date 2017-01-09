import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { observable, computed, action } from 'mobx';
import DevTools from 'mobx-react-devtools';
import axios from 'axios';

//material-ui
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
  from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import Temperature from './index_temperature';
import MyTableRowColumn from './MyTableRowColumn';

import userInfo from '../store/userState';

// const appState = observable({
//   count: 0,
//   searchText: '',
//   userData: {}
// });
const styles = {
  avatarImg: {
    height: 100,
    width: 100
  }
}

@observer
class GithubUser extends React.Component {

  @action
  getUserByName(userName) {
    let apiurl = 'https://api.github.com/users/' + userName;
    //console.log('getUserByName:', apiurl);
    //let reslength = 0;
    axios.get(apiurl).then((res) => {
      console.log('res:', res.data);
      //this.props.appState.userData = res.data;
      userInfo.userData = res.data;

    });
  }

  @action
  handleTextChange(e) {
    userInfo.searchText = e.target.value;
  }

  
  searchGit() {
    this.getUserByName(userInfo.searchText );
  } 

  showCell(e, f, g) {
    //console.log("showCell:", e);
    //console.log("showCell:", f);
    //console.log("showCell:",  g);
    //console.log("showCell:", this.props.appState.mrUser[e].APPL_NAME);
  }

  render() {
    //console.log(this.props);   

    let inputText_Name = <input type="text" value={this.props.value} onChange={this.handleTextChange.bind(this)} />;

    return (
      <div>
        Counter: {userInfo.count}<br />
        Login ID: {userInfo.userData.id} <br />
        <img src={userInfo.userData.avatar_url} style={styles.avatarImg} /> <br />
        <Avatar src={userInfo.userData.avatar_url} /> <br />
        <input type="text" value={this.props.value} onChange={this.handleTextChange.bind(this)} />
       
        <FlatButton label="Search Github" onClick={this.searchGit.bind(this)} primary={true}></FlatButton>
        
      </div>
    );
  }
}

export default GithubUser;