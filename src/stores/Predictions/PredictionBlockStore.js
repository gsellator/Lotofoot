import { BaseStore } from "fluxible/addons";
import Actions from "../../constants/Actions";

class PredictionBlockStore extends BaseStore {
  static storeName = "PredictionBlockStore"

  static handlers = {
    [Actions.APIOK_PREDICTIONS_BYGAME]: "handleApiOk",
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.data;
  }

  handleApiOk({ data, route }) {
    if (data && data[0] && data[0]._id){
      this.data = data[0];
    } else {
      this.data = {};
    }
    this.emitChange();
  }

  getData() {
    return this.data;
  }

  dehydrate() {
    return {
      data: this.data,
    };
  }

  rehydrate(state) {
    this.data = state.data;
  }
}

export default PredictionBlockStore;
