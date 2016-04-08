import { BaseStore } from "fluxible/addons";
import Actions from "../../constants/Actions";

class GamesTabStore extends BaseStore {
  static storeName = "GamesTabStore"

  static handlers = {
    [Actions.APIOK_GAMES]: "handleApiOk",
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.data;
  }

  handleApiOk({ data, route }) {
    this.data = data;
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

export default GamesTabStore;