import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { observable, computed, action } from 'mobx';
import DevTools from 'mobx-react-devtools';
import axios from 'axios';

//material-ui
//import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
  from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

//import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import Temperature from './index_temperature';
import MyTableRowColumn from './MyTableRowColumn';

import userInfo from '../store/userState';


@observer
class MRUser extends React.Component {

  @action
  handleTextChange(e, newValue) {
    userInfo.searchText = newValue;
    console.log('mr newValue:', newValue);
  }

  @action
  searchMR() {
    let apiurl = "http://localhost:59219/api/reacttest";
    axios.get(apiurl).then((res) => {
      console.log('res:', res.data[0].APPL_NAME);
      userInfo.mrUser = res.data;

    });
  }

  filterMR() {
    console.log(this.test );
  }

  componentDidMount() {
    this.searchMR();
  }

  showCell(e, f, g) {
    //console.log("showCell:", e);
    //console.log("showCell:", f);
    //console.log("showCell:",  g);
    //console.log("showCell:", this.props.appState.mrUser[e].APPL_NAME);
  }

  render() {
    //console.log(this.props);
    let table;
    let rows = [];
    if (userInfo.mrUser.length > 0) {
      {
        userInfo.mrUser.forEach((row, index) => {
          if (row.LastName.indexOf(userInfo.searchText) === -1) {
            return;
          }
          rows.push(<TableRow key={row.EmployeeID} selected={row.selected}>
            <TableRowColumn>{row.EmployeeID}</TableRowColumn>
            <TableRowColumn>{row.LastName}</TableRowColumn>
            <TableRowColumn>{row.FirstName} </TableRowColumn>
            <TableRowColumn>{row.Title} </TableRowColumn>
          </TableRow>);
        })
      }

      table =
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn colSpan="4" tooltip="Super Header" style={{ textAlign: 'center' }}>
                Super Header
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
              <TableHeaderColumn tooltip="Last Name">Last Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="First Name">First Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="Title">Title</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableRowColumn>ID</TableRowColumn>
              <TableRowColumn>Last Name</TableRowColumn>
              <TableRowColumn>First Name</TableRowColumn>
              <TableRowColumn>Title</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn colSpan="4" style={{ textAlign: 'center' }}>
                Super Footer
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
    }

    let inputText_Name = <input type="text" value={this.props.value} onChange={this.handleTextChange.bind(this)} />;

    return (
      <MuiThemeProvider>
        <div>
          <TextField hintText="Hint Text"
            floatingLabelText="Floating Label Text"
            onChange={this.handleTextChange.bind(this)}
            ref={(input)=>{ this.test = input; }}
            />

          <RaisedButton label="Search MR" onClick={this.filterMR.bind(this)} primary={true} />
          {table}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default MRUser;