import keyMirror from "keymirror";

const Actions = keyMirror({
  LOGIN_PENDING: null,
  LOGIN_SUCCESS: null,
  LOGIN_COOKIE_FOUND: null,
  LOGIN_UPDATE_CREDENTIALS: null,

  // FRONT
  DIALOG_LOGIN_FAILURE: null,
  DIALOG_SHOW: null,
  DIALOG_SUBMIT: null,
  ACCOUNT_DIALOG_SWITCH: null,
  ACCOUNT_DIALOG_CLOSE: null,
  NAV_SWITCH: null,
  NAV_CLOSE: null,

  // fluxible-router actions
  NAVIGATE_START: null,
  NAVIGATE_SUCCESS: null,
  NAVIGATE_FAILURE: null,

  // APP
  APIOK_USER_REGISTER: null,
  PENDING_USER_REGISTER: null,
  APIOK_USERS: null,

  APIOK_TEAMS: null,
  APIOK_GAMES: null,
  APIOK_GAME: null,
  APIOK_GAMES_NEXT: null,
  APIOK_PREDICTIONS: null,
  PENDING_PREDICTIONS_CREATE: null,
  APIOK_PREDICTIONS_CREATE: null,
  PENDING_PREDICTION_UPDATE: null,
  APIOK_PREDICTION_UPDATE: null,
  APIOK_PREDICTIONS_BYGAME: null,
  APIOK_PREDICTIONS_BYUSER: null,

  GAMESTAB_SET_TAB: null,
  GAMESTAB_SET_PHASE: null,
});

export default Actions;
