import { BaseStore } from "fluxible/addons";
import Actions from "../../constants/Actions";

class GamesTabStore extends BaseStore {
  static storeName = "GamesTabStore"

  static handlers = {
    [Actions.APIOK_GAMES]: "handleApiOk",
    [Actions.GAMESTAB_SET_TAB]: "handleSetTab",
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.data;
    this.tab = '-';
  }

  handleApiOk({ data, route }) {
    // We add rows witch allow to draw date headers in gamesTab.js
    if (data){
      this.data = data;
    } else {
      this.data = [];
    }
    this.emitChange();
  }

  handleSetTab(newTab) {
    this.tab = newTab;
    this.emitChange();
  }

  getData() {
    let tmpDataSource = [];
    if (this.tab === '-'){
      tmpDataSource = this.data;
    } else {
      for (let item of this.data){
        if (this.tab === item.group)
          tmpDataSource[tmpDataSource.length] = item;
      }
    }

    let tmpData = [];
    for (let item of tmpDataSource){
      if (tmpData.length === 0 && item.teamA && item.teamB){
        tmpData[0] = {isHeader: true, date: item.date}
        tmpData[1] = item;
      } else if (item.teamA && item.teamB) {
        if (tmpData[tmpData.length-1].date != item.date)
          tmpData[tmpData.length] = {isHeader: true, date: item.date}
        tmpData[tmpData.length] = item;
      }
    }
    return tmpData;
  }

  getTab() {
    return this.tab;
  }

  dehydrate() {
    return {
      data: this.data,
      tab: this.tab,
    };
  }

  rehydrate(state) {
    this.data = state.data;
    this.tab = state.tab;
  }
}

export default GamesTabStore;
