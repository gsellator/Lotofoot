import { BaseStore } from "fluxible/addons";
import Actions from "../../constants/Actions";

class DialogStore extends BaseStore {
  static storeName = "DialogStore"

  static handlers = {
    [Actions.DIALOG_SHOW]: "handleShow",
    [Actions.DIALOG_SUBMIT]: "handleSubmit",
  }

  constructor(dispatcher) {
    super(dispatcher);
    this._hasDialog = false;
    this._error = '';
    this._errorTxt = '';
  }

  handleShow({ error, errorTxt }) {
    this._hasDialog = true;
    this._error = error;
    this._errorTxt = errorTxt;
    this.emitChange();
  }

  handleSubmit() {
    this._hasDialog = false;
    this.emitChange();
  }

  hasDialog() {return this._hasDialog;}
  getError() {return this._error;}
  getErrorTxt() {return this._errorTxt;}

  dehydrate() {
    return {
      _hasDialog: this._hasDialog,
      _error: this._error,
      _errorTxt: this._errorTxt
    };
  }

  rehydrate(state) {
    this._hasDialog = state._hasDialog;
    this._error = state._error;
    this._errorTxt = state._errorTxt;
  }
}

export default DialogStore;