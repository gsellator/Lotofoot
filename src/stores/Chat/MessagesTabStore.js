import { BaseStore } from "fluxible/addons";
import Actions from "../../constants/Actions";

class MessagesTabStore extends BaseStore {
  static storeName = "MessagesTabStore"

  static handlers = {
    [Actions.APIOK_MESSAGES]: "handleApiOk",
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.data;
  }

  handleApiOk({ data, route }) {
    this.data = data;
    this.data = this.data.reverse();
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

export default MessagesTabStore;
