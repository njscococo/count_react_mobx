import { observable, computed, action } from 'mobx';

const userInfo = observable({
  count: 0,
  searchText: '',
  userData: {},
  mrUser: [],
  changeName: false
});

export default userInfo;