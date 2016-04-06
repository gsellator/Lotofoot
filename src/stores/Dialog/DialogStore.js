import { BaseStore } from "fluxible/addons";
import Actions from "../../constants/Actions";

class DialogStore extends BaseStore {
  static storeName = "DialogStore"

  static handlers = {
    [Actions.DIALOG_LOGIN_FAILURE]: "handleLoginFailure",
    [Actions.DIALOG_SUBMIT]: "handleSubmit",
    [Actions.DIALOG_SHOW]: "handleShow"
  }

  constructor(dispatcher) {
    super(dispatcher);

    this._hasDialog = false;
    this._txt = '';
  }

  handleLoginFailure(txt) {
    this._hasDialog = true;
    this._txt = txt;
    this.emitChange();
  }

  handleSubmit() {
    this._hasDialog = false;
    this.emitChange();
  }

  handleShow(txt) {
    this._hasDialog = true;
    this._txt = txt;
    this.emitChange();
  }

  hasDialog() {
    return this._hasDialog;
  }

  getTxt() {
    return this._txt;
  }

  dehydrate() {
    return {
      _hasDialog: this._hasDialog,
      _txt: this._txt
    };
  }

  rehydrate(state) {
    this._hasDialog = state._hasDialog;
    this._txt = state._txt;
  }
}

export default DialogStore;
