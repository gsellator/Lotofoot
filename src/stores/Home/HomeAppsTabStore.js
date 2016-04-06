import { BaseStore } from "fluxible/addons";
import Actions from "../../constants/Actions";

class HomeAppsTabStore extends BaseStore {
  static storeName = "HomeAppsTabStore"

  static handlers = {
    [Actions.APIOK_PUBLIC_APPS]: "handleApiOk",
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

export default HomeAppsTabStore;
