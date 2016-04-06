import { BaseStore } from "fluxible/addons";
import Actions from "../../constants/Actions";

class RefGroupsStore extends BaseStore {
  static storeName = "RefGroupsStore"

  static handlers = {
    [Actions.APIOK_REFGROUPS]: "handleApiOk"
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

export default RefGroupsStore;
