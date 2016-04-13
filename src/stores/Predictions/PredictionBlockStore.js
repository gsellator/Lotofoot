import { BaseStore } from "fluxible/addons";
import Actions from "../../constants/Actions";

class PredictionBlockStore extends BaseStore {
  static storeName = "PredictionBlockStore"

  static handlers = {
    [Actions.APIOK_PREDICTIONS_BYGAME]: "handleApiOk",
    [Actions.PENDING_PREDICTIONS_CREATE]: "handlePendingSwitch",
    [Actions.PENDING_PREDICTION_UPDATE]: "handlePendingSwitch",
    [Actions.APIOK_PREDICTIONS_CREATE]: "handleApiOkCreate",
    [Actions.APIOK_PREDICTION_UPDATE]: "handleApiOkModify",
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.data;
    this.pending = false;
  }

  handleApiOk({ data, route }) {
    if (data && data[0] && data[0]._id){
      this.data = data[0];
    } else {
      this.data = {};
    }
    this.pending = false;
    this.emitChange();
  }

  handlePendingSwitch() {
    this.pending = true;
    this.data = {};
    this.emitChange();
  }

  handleApiOkCreate({ data, route }){
    if (data && data._id){
      this.data = data;
    } else {
      this.data = {};
    }
    this.pending = false;
    this.emitChange();
  }

  handleApiOkModify({ data, route }){
    if (data && data._id){
      this.data = data;
    } else {
      this.data = {};
    }
    this.pending = false;
    this.emitChange();
  }

  getData() {
    return this.data;
  }

  getPending() {
    return this.pending;
  }

  dehydrate() {
    return {
      data: this.data,
      pending: this.pending,
    };
  }

  rehydrate(state) {
    this.data = state.data;
    this.pending = state.pending;
  }
}

export default PredictionBlockStore;
