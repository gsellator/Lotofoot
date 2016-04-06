import { BaseStore } from "fluxible/addons";
import Actions from "../../constants/Actions";

class AccountDialogStore extends BaseStore {
  static storeName = "AccountDialogStore"

  static handlers = {
    [Actions.ACCOUNT_DIALOG_SWITCH]: "handleSwitch",
    [Actions.ACCOUNT_DIALOG_CLOSE]: "handleClose"
  }

  constructor(dispatcher) {
    super(dispatcher);

    this._hasAccountDialog = false;
  }

  handleSwitch() {
    this._hasAccountDialog = !this._hasAccountDialog;
    this.emitChange();
  }

  handleClose() {
    this._hasAccountDialog = false;
    this.emitChange();
  }

  hasAccountDialog() {
    return this._hasAccountDialog;
  }

  dehydrate() {
    return {
      _hasAccountDialog: this._hasAccountDialog,
    };
  }

  rehydrate(state) {
    this._hasAccountDialog = state._hasAccountDialog;
  }
}

export default AccountDialogStore;
