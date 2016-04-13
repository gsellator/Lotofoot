import { BaseStore } from "fluxible/addons";
import Actions from "../../constants/Actions";

class TeamsDicoStore extends BaseStore {
  static storeName = "TeamsDicoStore"

  static handlers = {
    [Actions.APIOK_TEAMS]: "handleApiOk",
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.data;
  }

  handleApiOk({ data, route }) {
    if (data){
      this.data = {};
      for(let item of data){
        this.data[item._id] = item;
      }
    } else {
      this.data = {}
    }
    this.emitChange();
  }

  getData() {
    return this.data;
  }

  dehydrate() {
    return {
      data: this.data,
    };
  }

  rehydrate(state) {
    this.data = state.data;
  }
}

export default TeamsDicoStore;
