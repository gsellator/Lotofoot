import { BaseStore } from "fluxible/addons";
import Actions from "../../constants/Actions";

class RefAppsStore extends BaseStore {
  static storeName = "RefAppsStore"

  static handlers = {
    [Actions.APIOK_REFAPPS]: "handleApiOk"
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.data = {};
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
      data: this.data
    };
  }

  rehydrate(state) {
    this.data = state.data;
  }
}

export default RefAppsStore;
