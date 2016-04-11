import { BaseStore } from "fluxible/addons";
import Actions from "../../constants/Actions";

class RecoverPageStore extends BaseStore {
  static storeName = "RecoverPageStore"

  static handlers = {
    [Actions.RECOVER_INIT]: "handleInit",
    [Actions.RECOVER_INIT_FAILED]: "handleInitFailed",
    [Actions.RECOVER_PENDING]: "handlePending",
    [Actions.RECOVER_FAILED]: "handleFailed",
    [Actions.RECOVER_SUCCESS]: "handleSuccess",
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.initFailure = false;
    this.pending = false;
    this.success = false;
    this.username;
  }

  handleInit() {
    this.initFailure = false;
    this.pending = false;
    this.success = false;
    this.username = undefined;
    this.emitChange();
  }

  handleInitFailed() {
    this.initFailure = true;
    this.emitChange();
  }

  handlePending() {
    this.pending = true;
    this.success = false;
    this.emitChange();
  }

  handleFailed() {
    this.pending = false;
    this.success = false;
    this.emitChange();
  }

  handleSuccess(username) {
    this.pending = false;
    this.success = true;
    this.username = username;
    this.emitChange();
  }

  getPending() {
    return this.pending;
  }

  getInitFailure() {
    return this.initFailure;
  }

  getSuccess() {
    return this.success;
  }

  getUsername() {
    return this.username;
  }

  dehydrate() {
    return {
      pending: this.pending,
      initFailure: this.initFailure,
      success: this.success,
      username: this.username,
    };
  }

  rehydrate(state) {
    this.pending = state.pending;
    this.initFailure = state.initFailure;
    this.success = state.success;
    this.username = state.username;
  }
}

export default RecoverPageStore;