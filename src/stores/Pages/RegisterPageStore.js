import { BaseStore } from "fluxible/addons";
import Actions from "../../constants/Actions";

class RegisterPageStore extends BaseStore {
  static storeName = "RegisterPageStore"

  static handlers = {
    [Actions.REGISTER_INIT]: "handleInit",
    [Actions.REGISTER_PENDING]: "handlePending",
    [Actions.REGISTER_SUCCESS]: "handleLoginSuccess",
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.pending = false;
  }

  handleInit() {
    this.pending = false;
    this.emitChange();
  }

  handlePending() {
    this.pending = true;
    this.emitChange();
  }

  handleLoginSuccess({ data, route, url }) {
    this.pending = false;
    this.emitChange();
  }

  getPending() {return this.pending;}

  dehydrate() {
    return {
      pending: this.pending,
    };
  }

  rehydrate(state) {
    this.pending = state.pending;
  }
}

export default RegisterPageStore;