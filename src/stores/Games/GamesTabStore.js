import { BaseStore } from "fluxible/addons";
import FormatDate from "../../components/Helpers/FormatDate";
import Actions from "../../constants/Actions";

class GamesTabStore extends BaseStore {
  static storeName = "GamesTabStore"

  static handlers = {
    [Actions.APIOK_GAMES]: "handleApiOkGames",
    [Actions.APIOK_PREDICTIONS_BYUSER_DICO]: "handleApiOkPredictions",
    [Actions.GAMESTAB_SET_FILTER]: "handleSetFilter",
    [Actions.GAMESTAB_SET_SUBFILTER]: "handleSetSubfilter",
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.games;
    this.predictions;
    this.filter = 'match';
    this.subfilter = '-';
  }

  handleApiOkGames({ data, route }) {
    if (data){
      this.games = data;
    } else {
      this.games = [];
    }
    this.emitChange();
  }

  handleApiOkPredictions({ data, route }) {
    if (data){
      this.predictions = {};
      for(let item of data){
        this.predictions[item.game._id] = item;
      }
    } else {
      this.predictions = {}
    }
    this.emitChange();
  }

  handleSetFilter(newFilter) {
    this.filter = newFilter;
    this.subfilter = '-';
    this.emitChange();
  }

  handleSetSubfilter(newSubfilter) {
    this.subfilter = newSubfilter;
    this.emitChange();
  }

  getGames() {
    // We filter on the group
    let tmpGamesSource = [];
    switch (this.filter){
      case "match":
        if (this.subfilter === '-'){
          tmpGamesSource = this.games;
        } else if (this.subfilter == 1) {
          tmpGamesSource = this.games;
        } else if (this.predictions) {
          for (let item of this.games){
            if (!this.predictions[item._id])
              tmpGamesSource[tmpGamesSource.length] = item;
          }
        }
        break;

      case "group":
        if (this.subfilter === '-'){
          for (let item of this.games){
            if (item.phase === 0)
              tmpGamesSource[tmpGamesSource.length] = item;
          }
        } else {
          for (let item of this.games){
            if (item.phase === 0 && this.subfilter === item.group)
              tmpGamesSource[tmpGamesSource.length] = item;
          }
        }
        break;

      case "finale":
        if (this.subfilter === '-'){
          for (let item of this.games){
            if (item.phase > 0)
              tmpGamesSource[tmpGamesSource.length] = item;
          }
        } else {
          for (let item of this.games){
            if (this.subfilter == item.phase)
              tmpGamesSource[tmpGamesSource.length] = item;
          }
        }
        break;
    }

    // We add rows witch allow to draw date headers in gamesTab.js
    let tmpGames = [];
    for (let item of tmpGamesSource){
      if (tmpGames.length === 0){
        tmpGames[0] = {isHeader: true, datetime: item.datetime}
        tmpGames[1] = item;
      } else {
        if (FormatDate.dtetimeToStr(tmpGames[tmpGames.length-1].datetime, 'YYYY-MM-DD') != FormatDate.dtetimeToStr(item.datetime, 'YYYY-MM-DD'))
          tmpGames[tmpGames.length] = {isHeader: true, datetime: item.datetime}
        tmpGames[tmpGames.length] = item;
      }
    }

    return tmpGames;
  }

  getPredictions() {return this.predictions;}
  getFilter() {return this.filter;}
  getSubfilter() {return this.subfilter;}

  dehydrate() {
    return {
      games: this.games,
      predictions: this.predictions,
      filter: this.filter,
      subfilter: this.subfilter,
    };
  }

  rehydrate(state) {
    this.games = state.games;
    this.predictions = state.predictions;
    this.filter = state.filter;
    this.subfilter = state.subfilter;
  }
}

export default GamesTabStore;
