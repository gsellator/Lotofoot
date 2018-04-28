import { BaseStore } from "fluxible/addons";
import Actions from "../../constants/Actions";

class RecoverPageStore extends BaseStore {
  static storeName = "RecoverPageStore"

  static handlers = {
    [Actions.RECOVER_INIT_OK]: "handleInitOk",
    [Actions.RECOVER_PENDING]: "handlePending",
    [Actions.RECOVER_SUCCESS]: "handleSuccess",
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.initFailure = false;
    this.email = undefined;
    this.pending = false;
    this.success = false;
  }

  handleInitOk({ data, route, url }) {
    this.initFailure = data && data._id ? false : true;
//    this.email = data && data.email ? data.email : undefined;
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
  getEmail() {return this.email;}
  getInitFailure() {return this.initFailure;}
  getSuccess() {return this.success;}

  dehydrate() {
    return {
      pending: this.pending,
      email: this.email,
      initFailure: this.initFailure,
      success: this.success,
    };
  }

  rehydrate(state) {
    this.pending = state.pending;
    this.email = state.email;
    this.initFailure = state.initFailure;
    this.success = state.success;
  }
}

export default RecoverPageStore;