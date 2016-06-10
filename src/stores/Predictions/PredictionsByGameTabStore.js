import { BaseStore } from "fluxible/addons";
import _ from "lodash";
import Actions from "../../constants/Actions";

class PredictionsByGameTabStore extends BaseStore {
  static storeName = "PredictionsByGameTabStore"

  static handlers = {
    [Actions.APIOK_PREDICTIONS_BYGAME]: "handleApiOk",
    [Actions.APIOK_USERS]: "handleApiOkUsers",
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.data;
  }

  handleApiOk({ data, route }) {
    this.data = data;
    this.data = _.sortBy(data, function(item){ return -item.score; });
    this.emitChange();
  }

  handleApiOkUsers({ data, route }) {
    this.users = {};
    if (data){
      for (let item of data)
        this.users[item._id] = {
          firstName: item.firstName,
          lastName: item.lastName
        };
    }
    this.emitChange();
  }

  getData() {return this.data;}
  getUsers() {return this.users;}

  dehydrate() {
    return {
      data: this.data,
      users: this.users,
    };
  }

  rehydrate(state) {
    this.data = state.data;
    this.users = state.users;
  }
}

export default PredictionsByGameTabStore;
