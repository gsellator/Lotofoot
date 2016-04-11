import { BaseStore } from "fluxible/addons";
import Actions from "../../constants/Actions";

class RecoverInitPageStore extends BaseStore {
  static storeName = "RecoverInitPageStore"

  static handlers = {
    [Actions.RECOVERINIT_INIT]: "handleInit",
    [Actions.RECOVERINIT_PENDING]: "handlePending",
    [Actions.RECOVERINIT_FAILED]: "handleFailed",
    [Actions.RECOVERINIT_SUCCESS]: "handleSuccess",
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.pending = false;
    this.success = false;
    this.username;
  }

  handleInit() {
    this.pending = false;
    this.success = false;
    this.username = undefined;
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

  getSuccess() {
    return this.success;
  }

  getUsername() {
    return this.username;
  }

  dehydrate() {
    return {
      pending: this.pending,
      success: this.success,
      username: this.username,
    };
  }

  rehydrate(state) {
    this.pending = state.pending;
    this.success = state.success;
    this.username = state.username;
  }
}

export default RecoverInitPageStore;