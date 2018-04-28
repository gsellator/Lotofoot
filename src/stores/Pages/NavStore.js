import { BaseStore } from "fluxible/addons";

import Actions from "../../constants/Actions";
import Sections from "../../constants/Sections";
import labels from "../../labels";

class NavStore extends BaseStore {
  static storeName = "NavStore"

  static handlers = {
    [Actions.LOGIN_UPDATE_CREDENTIALS]: "handleUpdateCredentials",
    [Actions.NAV_SWITCH]: "handleNavSwitch",
    [Actions.NAV_CLOSE]: "handleNavClose"
  }

  constructor(dispatcher) {
    super(dispatcher);

    this._hasNav = false;
    this.sections = [];
  }

  handleUpdateCredentials({ accessToken, credentials }) {
    if (accessToken && credentials && (JSON.stringify(credentials) !== JSON.stringify(this.credentials))) {
      this.sections = [];
      for (const sect of Sections){
        this.sections.push({
          name: sect.name,
          label: labels[sect.name],
        })
      }
    }
    this.emitChange();
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

  hasNav() {return this._hasNav;}
  getSections(){return this.sections;}

  dehydrate() {
    return {
      _hasNav: this._hasNav,
      sections: this.sections,
    };
  }

  rehydrate(state) {
    this._hasNav = state._hasNav;
    this.sections = state.sections;
  }
}

export default NavStore;
