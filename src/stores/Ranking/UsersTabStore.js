import { BaseStore } from "fluxible/addons";
import Actions from "../../constants/Actions";

class UsersTabStore extends BaseStore {
  static storeName = "UsersTabStore"

  static handlers = {
    [Actions.APIOK_USERS]: "handleApiOk",
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

export default UsersTabStore;
