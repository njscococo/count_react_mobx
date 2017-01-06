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
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
  from 'material-ui/Table';

import Temperature from './index_temperature';
import MyTableRowColumn from './MyTableRowColumn';

//injectTapEventPlugin();

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
      this.props.appState.userData = res.data;

    });

  }

  @action
  handleInc() {
    //console.log("+", typeof(this.getUserByName()));
    this.props.appState.count++;
    //this.getUserByName('mobxjs');

  }

  @action
  handleDec() {
    console.log("-");
    this.props.appState.count--;
  }

  @action
  handleTextChange(e) {
    this.props.appState.searchText = e.target.value;

  }

  @action
  clickSend() {
    //this.getUserByName(this.props.appState.searchText );

    let apiurl = "http://localhost:59219/api/reacttest";
    axios.get(apiurl).then((res) => {
      console.log('res:', res.data[0].APPL_NAME);
      this.props.appState.mrUser = res.data;

    });
  }

  showCell(e, f, g) {
    //console.log("showCell:", e);
    //console.log("showCell:", f);
    //console.log("showCell:",  g);
    //console.log("showCell:", this.props.appState.mrUser[e].APPL_NAME);
  }

  changeName() {
    console.log('changeName:');
  }

  render() {
    //console.log(this.props);
    let table;
    if(this.props.appState.mrUser.length>0){
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
              {this.props.appState.mrUser.map((row, index) => (
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
    return (
      <div >

        Counter: {this.props.appState.count}<br />
        Login ID: {this.props.appState.userData.id} <br />
        <img src={this.props.appState.userData.avatar_url} style={styles.avatarImg} /> <br />
        <input type="text" value={this.props.value} onChange={this.handleTextChange.bind(this)} />
        <button onClick={this.clickSend.bind(this)}>Search</button>
        <button onClick={this.handleInc.bind(this)}>+</button>
        <button onClick={this.handleDec.bind(this)}>-</button>
        <div>{this.props.appState.searchText}</div>

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