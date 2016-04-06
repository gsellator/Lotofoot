import { BaseStore } from "fluxible/addons";
import Actions from "../../constants/Actions";

class NavStore extends BaseStore {
  static storeName = "NavStore"

  static handlers = {
    [Actions.NAV_SWITCH]: "handleNavSwitch",
    [Actions.NAV_CLOSE]: "handleNavClose"
  }

  constructor(dispatcher) {
    super(dispatcher);

    this._hasNav = false;
  }

  handleNavSwitch() {
    this._hasNav = !this._hasNav;
    this.emitChange();
  }

  handleNavClose() {
    if (this._hasNav){
      this._hasNav = false;
      this.emitChange();
    }
  }

  hasNav() {
    return this._hasNav;
  }

  dehydrate() {
    return {
      _hasNav: this._hasNav
    };
  }

  rehydrate(state) {
    this._hasNav = state._hasNav;
  }
}

export default NavStore;
