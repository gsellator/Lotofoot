import { BaseStore } from "fluxible/addons";
import Actions from "../../constants/Actions";

class ModalStore extends BaseStore {
  static storeName = "ModalStore"

  static handlers = {
    [Actions.FLUSH_MODAL]: "handleFlush",
    [Actions.APIOK_GAME]: "handleApiOkGame",
    [Actions.APIOK_PREDICTIONS_BYGAMEANDUSER]: "handleApiOkPred",
    [Actions.PENDING_PREDICTIONS_CREATE]: "handlePendingSwitch",
    [Actions.PENDING_PREDICTION_UPDATE]: "handlePendingSwitch",
    [Actions.APIOK_PREDICTIONS_CREATE]: "handleApiOkCreate",
    [Actions.APIOK_PREDICTION_UPDATE]: "handleApiOkModify",
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.url = undefined;
    this.gameData = undefined;
    this.predData = undefined;
    this.predPending = false;
  }

  handleFlush({ url }) {
    this.url = url;
    this.gameData = undefined;
    this.predData = undefined;
    this.predPending = false;
    this.emitChange();
  }

  handleApiOkGame({ data, route, url }) {
    if (this.url === url){
      if (data && data._id){
        this.gameData = data;
      } else {
        this.gameData = {};
      }
      this.emitChange();
    }
  }

  handleApiOkPred({ data, route, url }) {
    if (this.url === url){
      if (data && data[0] && data[0]._id){
        this.predData = data[0];
      } else {
        this.predData = {};
      }
      this.emitChange();
    }
  }

  handlePendingSwitch() {
    this.predPending = true;
    this.emitChange();
  }

  handleApiOkCreate({ data, route, url }){
    if (data && data._id){
      this.predData = data;
    } else {
      this.predData = {};
    }
    setTimeout(() => {
      this.predPending = false;
    }, 4000);
    this.emitChange();
  }

  handleApiOkModify({ data, route, url }){
    if (data && data._id){
      this.predData = data;
    } else {
      this.predData = undefined;
    }
    setTimeout(() => {
      this.predPending = false;
    }, 4000);
    this.emitChange();
  }

  getUrl() {return this.url;}
  getGameData() {return this.gameData;}
  getPredData() {return this.predData;}
  getPredPending() {return this.predPending;}

  dehydrate() {
    return {
      url: this.url,
      gameData: this.gameData,
      predData: this.predData,
      predPending: this.predPending,
    };
  }

  rehydrate(state) {
    this.url = state.url;
    this.gameData = state.gameData;
    this.predData = state.predData;
    this.predPending = state.predPending;
  }
}

export default ModalStore;
