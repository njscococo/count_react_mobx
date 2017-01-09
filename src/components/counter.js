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

injectTapEventPlugin();

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
class Counter extends React.Component {

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
  handleInc() {
    //console.log("+", typeof(this.getUserByName()));
    userInfo.count++;
    //this.getUserByName('mobxjs');

  }

  @action
  handleDec() {
    console.log("-");
    userInfo.count--;
  }

  @action
  handleTextChange(e) {
    userInfo.searchText = e.target.value;

  }

  @action
  searchGit() {
    this.getUserByName(userInfo.searchText );
  }

  @action
  searchMR() {
    let apiurl = "http://localhost:59219/api/reacttest";
    axios.get(apiurl).then((res) => {
      console.log('res:', res.data[0].APPL_NAME);
      userInfo.mrUser = res.data;

    });
  }

  showCell(e, f, g) {
    //console.log("showCell:", e);
    //console.log("showCell:", f);
    //console.log("showCell:",  g);
    //console.log("showCell:", this.props.appState.mrUser[e].APPL_NAME);
  }

  @action
  changeName() {        
    userInfo.changeName = true;
    console.log('changeName:', userInfo.changeName);
  }

  render() {
    //console.log(this.props);
    let table;
    if(userInfo.mrUser.length>0){
          table = 
          <Table onCellClick={this.changeName.bind(this)}  >
            <TableHeader>
              <TableRow>
                <TableHeaderColumn colSpan="3" tooltip="Super Header" style={{ textAlign: 'center' }}>
                  Super Header
              </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
                <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
                <TableHeaderColumn tooltip="The Status">Status</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userInfo.mrUser.map((row, index) => (
                <TableRow key={index} selected={row.selected}>
                  <TableRowColumn>{index}</TableRowColumn>
                  <TableRowColumn>{row.APPL_NAME}</TableRowColumn>
                  <TableRowColumn>{row.APPL_ID} </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableRowColumn>ID</TableRowColumn>
                <TableRowColumn>Name</TableRowColumn>
                <TableRowColumn>Status</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn colSpan="3" style={{ textAlign: 'center' }}>
                  Super Footer
              </TableRowColumn>
              </TableRow>
            </TableFooter>
          </Table>
        }

    let inputText_Name = <input type="text" value={this.props.value} onChange={this.handleTextChange.bind(this)} />;

    return (
      <div>
        Counter: {userInfo.count}<br />
        Login ID: {userInfo.userData.id} <br />
        <img src={userInfo.userData.avatar_url} style={styles.avatarImg} /> <br />
        <Avatar src={userInfo.userData.avatar_url} /> <br />
        <input type="text" value={this.props.value} onChange={this.handleTextChange.bind(this)} />
        <RaisedButton label="Search MR" onClick={this.searchMR.bind(this)} primary={true}/>
        <FlatButton label="Search Github" onClick={this.searchGit.bind(this)} primary={true}></FlatButton>
        <button onClick={this.handleInc.bind(this)}>+</button>
        <button onClick={this.handleDec.bind(this)}>-</button>
        <div>{userInfo.searchText}</div>

        {table}

        <Temperature />
        <div>
          <DevTools />
        </div>
      </div>
    );
  }
}

export default Counter;