import { BaseStore } from "fluxible/addons";
import Actions from "../../constants/Actions";

class GameModalStore extends BaseStore {
  static storeName = "GameModalStore"

  static handlers = {
    [Actions.GAMEMODAL_SWITCH]: "switchHasGameModal",
  }

  constructor(dispatcher) {
    super(dispatcher);
    const route = this.dispatcher.getStore("RouteStore").getCurrentRoute();
    const game = route ? route.query.game : undefined;

    if (game){
      this.hasGameModal = true;
      this.game = game;
    } else {
      this.hasGameModal = false;
      this.game;
    }
  }

  switchHasGameModal({ hasGameModal, game }){
    this.hasGameModal = hasGameModal;

    if (hasGameModal) {
      this.game = game;
    } else {
      this.game = undefined;
    }
    this.emitChange();
  }

  getHasGameModal() {return this.hasGameModal;}
  getGame() {return this.game;}

  dehydrate() {
    return {
      hasGameModal: this.hasGameModal,
      game: this.game,
    };
  }

  rehydrate(state) {
    this.hasGameModal = state.hasGameModal;
    this.game = state.game;
  }
}

export default GameModalStore;
