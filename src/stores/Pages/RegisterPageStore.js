import { BaseStore } from "fluxible/addons";
import Actions from "../../constants/Actions";

class RegisterPageStore extends BaseStore {
  static storeName = "RegisterPageStore"

  static handlers = {
    [Actions.REGISTER_INIT]: "handleInit",
    [Actions.REGISTER_PENDING]: "handlePending",
    [Actions.REGISTER_SUCCESS]: "handleSuccess",
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.pending = false;
    this.success = false;
  }

  handleInit() {
    this.pending = false;
    this.success = false;
    this.emitChange();
  }

  handlePending() {
    this.pending = true;
    this.success = false;
    this.emitChange();
  }

  handleSuccess({ data, route, url }) {
    this.pending = false;
    this.success = true;
    this.emitChange();
  }

  getPending() {return this.pending;}
  getSuccess() {return this.success;}

  dehydrate() {
    return {
      pending: this.pending,
      success: this.success,
    };
  }

  rehydrate(state) {
    this.pending = state.pending;
    this.success = state.success;
  }
}

export default RegisterPageStore;