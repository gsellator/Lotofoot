import { BaseStore } from "fluxible/addons";
import Actions from "../../constants/Actions";

class GameBlockStore extends BaseStore {
  static storeName = "GameBlockStore"

  static handlers = {
    [Actions.APIOK_GAME]: "handleApiOk",
    [Actions.APIOK_GAMES_NEXT]: "handleApiOkNext",
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

  handleApiOkNext({ data, route }) {
    if (data && data[0]){
      this.data = data[0];
    } else {
      this.data = {};
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
