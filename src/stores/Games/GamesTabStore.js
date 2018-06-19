import { BaseStore } from "fluxible/addons";
import FormatDate from "daily-helpers/dist/FormatDate";
import Actions from "../../constants/Actions";
import _ from "lodash";

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
    this.subfilter = '1';
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
    switch (newFilter){
      case "match":
        this.subfilter = '-';
      break;
      case "group":
        this.subfilter = 'a';
      break;
      case "finale":
        this.subfilter = '1';
      break;
    }
    this.emitChange();
  }

  handleSetSubfilter(newSubfilter) {
    this.subfilter = newSubfilter;
    this.emitChange();
  }

  getDays() {
    if (!this.games){return undefined;}

    // We filter on the group
    let tmpSource = [];
    switch (this.filter){
      case "match":
        if (this.subfilter === '-'){
          tmpSource = this.games;
        } else if (this.subfilter == 1) {
          let firstMatchIndex = this.games.length - 1;
          for (let i=0; i<this.games.length; i++){
            if (this.games[i].status === 'TIMED' && i<firstMatchIndex)
              firstMatchIndex = i;
          }
          if (firstMatchIndex>2)
            firstMatchIndex = firstMatchIndex - 3;
          else
            firstMatchIndex = 0;
          tmpSource = this.games.slice(firstMatchIndex, this.games.length);
        } else if (this.predictions) {
          for (let item of this.games){
            if (item.status === 'TIMED' && !this.predictions[item._id])
              tmpSource[tmpSource.length] = item;
          }
        }
        break;

      case "group":
        if (this.subfilter === '-'){
          for (let item of this.games){
            if (item.phase === 0)
              tmpSource[tmpSource.length] = item;
          }
        } else {
          for (let item of this.games){
            if (item.phase === 0 && this.subfilter === item.group)
              tmpSource[tmpSource.length] = item;
          }
        }
        break;

      case "finale":
        if (this.subfilter === '-'){
          for (let item of this.games){
            if (item.phase > 0)
              tmpSource[tmpSource.length] = item;
          }
        } else {
          for (let item of this.games){
            if (this.subfilter == item.phase)
              tmpSource[tmpSource.length] = item;
          }
        }
        break;
    }

    // We add rows witch allow to draw date headers in gamesTab.js
    let tmpDays = [];
    for (let item of tmpSource){
      if (tmpDays.length === 0 || (FormatDate.dtetimeToStr(tmpDays[tmpDays.length-1].datetime, 'YYYY-MM-DD') != FormatDate.dtetimeToStr(item.datetime, 'YYYY-MM-DD'))){
        tmpDays[tmpDays.length] = {
          isHeader: true,
          datetime: item.datetime,
          games: [item]
        };
      } else {
        tmpDays[tmpDays.length - 1].games[tmpDays[tmpDays.length - 1].games.length] = item;
      }
    }


    return tmpDays;
  }

  getGroupRanking() {
    // We filter on the group
    let teams = {};

    if (this.predictions && this.filter === 'group'){
      for (let item of this.games){
        if (item.phase === 0 && this.subfilter === item.group && item.teamA && item.teamB && this.predictions[item._id]){
          if (!teams[item.teamA._id])
            teams[item.teamA._id] = { slug: item.teamA.slug, points: 0, dif: 0 };
          if (!teams[item.teamB._id])
            teams[item.teamB._id] = { slug: item.teamB.slug, points: 0, dif: 0 };

          switch (this.predictions[item._id].winner){
            case "nobody":
              teams[item.teamA._id].points = teams[item.teamA._id].points + 1;
              teams[item.teamB._id].points = teams[item.teamB._id].points + 1;
            break;
            case "teamA":
              teams[item.teamA._id].points = teams[item.teamA._id].points + 3;
              teams[item.teamA._id].dif = teams[item.teamA._id].dif + this.predictions[item._id].scoreTeamA - this.predictions[item._id].scoreTeamB;
              teams[item.teamB._id].dif = teams[item.teamB._id].dif + this.predictions[item._id].scoreTeamB - this.predictions[item._id].scoreTeamA;
            break;
            case "teamB":
              teams[item.teamB._id].points = teams[item.teamB._id].points + 3;
              teams[item.teamA._id].dif = teams[item.teamA._id].dif + this.predictions[item._id].scoreTeamA - this.predictions[item._id].scoreTeamB;
              teams[item.teamB._id].dif = teams[item.teamB._id].dif + this.predictions[item._id].scoreTeamB - this.predictions[item._id].scoreTeamA;
            break;
          };
        }
      }
    }

    let teamsArray = [];
    for (let item in teams){
      teamsArray[teamsArray.length] = teams[item];
    }

    return _.sortBy(teamsArray, function(tm){ return -tm.points*100 - tm.dif; });
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
