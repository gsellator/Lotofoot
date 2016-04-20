import { BaseStore } from "fluxible/addons";
import Actions from "../../constants/Actions";

class CurrentGameStore extends BaseStore {
  static storeName = "CurrentGameStore"

  static handlers = {
    [Actions.APIOK_GAMES_NEXT]: "handleApiOk",
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.data;
  }

  handleApiOk({ data, route }) {
    if (data && data[0]){
      this.data = data[0];
    } else {
      this.data = {};
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

export default CurrentGameStore;
