import { BaseStore } from "fluxible/addons";
import Actions from "../../constants/Actions";

class RecoverInitPageStore extends BaseStore {
  static storeName = "RecoverInitPageStore"

  static handlers = {
    [Actions.RECOVERINIT_INIT]: "handleInit",
    [Actions.RECOVERINIT_PENDING]: "handlePending",
    [Actions.RECOVERINIT_SUCCESS]: "handleSuccess",
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.email = undefined;
    this.pending = false;
    this.success = false;
  }

  handleInit() {
    this.email = undefined;
    this.pending = false;
    this.success = false;
    this.emitChange();
  }

  handlePending() {
    this.pending = true;
    this.success = false;
    this.emitChange();
  }

  handleSuccess({ data, route, url, email }) {
    this.email = email;
    this.pending = false;
    this.success = true;
    this.emitChange();
  }

  getEmail() {return this.email;}
  getPending() {return this.pending;}
  getSuccess() {return this.success;}

  dehydrate() {
    return {
      email: this.email,
      pending: this.pending,
      success: this.success,
    };
  }

  rehydrate(state) {
    this.email = state.email;
    this.pending = state.pending;
    this.success = state.success;
  }
}

export default RecoverInitPageStore;