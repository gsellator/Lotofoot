import { BaseStore } from "fluxible/addons";
import FormatDate from "../../components/Helpers/FormatDate";
import Actions from "../../constants/Actions";

class GamesTabStore extends BaseStore {
  static storeName = "GamesTabStore"

  static handlers = {
    [Actions.APIOK_GAMES]: "handleApiOk",
    [Actions.GAMESTAB_SET_TAB]: "handleSetTab",
    [Actions.GAMESTAB_SET_PHASE]: "handleSetPhase",
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.data;
    this.tab = '-';
    this.phase = '0';
  }

  handleApiOk({ data, route }) {
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

  handleSetPhase(newPhase) {
    this.phase = newPhase;
    this.emitChange();
  }

  getData() {
    // We filter on the group
    let tmpDataSource = [];
    if (this.tab === '-'){
      tmpDataSource = this.data;
    } else {
      for (let item of this.data){
        if (this.tab === item.group)
          tmpDataSource[tmpDataSource.length] = item;
      }
    }

    // We add rows witch allow to draw date headers in gamesTab.js
    let tmpData = [];
    for (let item of tmpDataSource){
      if (tmpData.length === 0 && item.teamA && item.teamB){
        tmpData[0] = {isHeader: true, datetime: item.datetime}
        tmpData[1] = item;
      } else if (item.teamA && item.teamB) {
        if (FormatDate.dtetimeToStr(tmpData[tmpData.length-1].datetime, 'YYYY-MM-DD') != FormatDate.dtetimeToStr(item.datetime, 'YYYY-MM-DD'))
          tmpData[tmpData.length] = {isHeader: true, datetime: item.datetime}
        tmpData[tmpData.length] = item;
      }
    }
    return tmpData;
  }

  getTab() {
    return this.tab;
  }

  getPhase() {
    return this.phase;
  }

  dehydrate() {
    return {
      data: this.data,
      tab: this.tab,
      phase: this.phase,
    };
  }

  rehydrate(state) {
    this.data = state.data;
    this.tab = state.tab;
    this.phase = state.phase;
  }
}

export default GamesTabStore;
