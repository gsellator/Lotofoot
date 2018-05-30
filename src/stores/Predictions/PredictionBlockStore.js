import { BaseStore } from "fluxible/addons";
import Actions from "../../constants/Actions";

class PredictionBlockStore extends BaseStore {
  static storeName = "PredictionBlockStore"

  static handlers = {
    [Actions.APIOK_PREDICTIONS_BYGAMEANDUSER]: "handleApiOk",
    [Actions.PENDING_PREDICTIONS_CREATE]: "handlePendingSwitch",
    [Actions.PENDING_PREDICTION_UPDATE]: "handlePendingSwitch",
    [Actions.APIOK_PREDICTIONS_CREATE]: "handleApiOkCreate",
    [Actions.APIOK_PREDICTION_UPDATE]: "handleApiOkModify",
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.data = {};
    this.pending = false;
  }

  handleApiOk({ data, route }) {
    if (route){
      const game = route.query.game;
      if (data && data[0] && data[0]._id){
        this.data[game] = data[0];
      } else {
        this.data[game] = undefined;
      }
    }
    this.pending = false;
    this.emitChange();
  }

  handlePendingSwitch() {
    this.pending = true;
    this.emitChange();
  }

  handleApiOkCreate({ data, route }){
    if (route){
      const game = route.query.game;
      if (data && data._id){
        this.data[game] = data;
      } else {
        this.data[game] = undefined;
      }
      setTimeout(() => {
        this.pending = false;
      }, 4000);
    } else {
      this.pending = false;
    }
    this.emitChange();
  }

  handleApiOkModify({ data, route }){
    if (route){
      const game = route.query.game;
      if (data && data._id){
        this.data[game] = data;
      } else {
        this.data[game] = undefined;
      }
      setTimeout(() => {
        this.pending = false;
      }, 4000);
    } else {
      this.pending = false;
    }
    this.emitChange();
  }

  getData(game) {return this.data[game] ? this.data[game] : { scoreTeamA: '', scoreTeamB: '', winner: undefined };}
  getPending() {return this.pending;}

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
