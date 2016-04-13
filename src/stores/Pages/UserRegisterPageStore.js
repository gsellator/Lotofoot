import { BaseStore } from "fluxible/addons";
import Actions from "../../constants/Actions";

class UserRegisterPageStore extends BaseStore {
  static storeName = "UserRegisterPageStore"

  static handlers = {
    [Actions.PENDING_USER_REGISTER]: "handlePending",
    [Actions.APIOK_USER_REGISTER]: "handleLoginSuccess",
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.pending = false;
  }

  handlePending() {
    this.pending = true;
    this.emitChange();
  }

  handleLoginSuccess(access_token) {
    this.pending = false;
    this.emitChange();
  }

  getPending() {
    return this.pending;
  }

  dehydrate() {
    return {
      pending: this.pending,
    };
  }

  rehydrate(state) {
    this.pending = state.pending;
  }
}

export default UserRegisterPageStore;