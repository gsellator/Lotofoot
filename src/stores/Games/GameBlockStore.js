import { BaseStore } from "fluxible/addons";
import Actions from "../../constants/Actions";

class GameBlockStore extends BaseStore {
  static storeName = "GameBlockStore"

  static handlers = {
    [Actions.APIOK_GAME]: "handleApiOk",
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.data = {};
  }

  handleApiOk({ data, route }) {
    if (data && data._id){
      this.data[data._id] = data;
    } else {
      this.data[data._id] = {};
    }
    this.emitChange();
  }

  getData(_id) {return this.data[_id];}

  dehydrate() {
    return {
      data: this.data,
    };
  }

  rehydrate(state) {
    this.data = state.data;
  }
}

export default GameBlockStore;
