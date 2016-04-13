import { BaseStore } from "fluxible/addons";
import Actions from "../../constants/Actions";

class GameBlockStore extends BaseStore {
  static storeName = "GameBlockStore"

  static handlers = {
    [Actions.APIOK_GAME]: "handleApiOk",
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.data;
  }

  handleApiOk({ data, route }) {
    if (data){
      this.data = data;
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

export default GameBlockStore;
