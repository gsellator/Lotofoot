import keyMirror from "keymirror";

const Actions = keyMirror({
  LOGIN_PENDING: null,
  LOGIN_SUCCESS: null,
  LOGIN_FAILURE: null,
  LOGIN_UPDATE_CREDENTIALS: null,
  //LOGOUT_SUCCESS: null,

  REGISTER_INIT: null,
  REGISTER_PENDING: null,
  REGISTER_SUCCESS: null,
  REGISTER_FAILURE: null,

  RECOVERINIT_INIT: null,
  RECOVERINIT_PENDING: null,
  RECOVERINIT_SUCCESS: null,
  RECOVER_INIT_OK: null,
  RECOVER_PENDING: null,
  RECOVER_SUCCESS: null,

  // FRONT
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
  FLUSH_MODAL: null,
  APIOK_USERS: null,

  APIOK_TEAMS: null,
  APIOK_GAMES: null,
  APIOK_GAME: null,
  APIOK_GAMES_NEXT: null,
  APIOK_GAMES_NEXTMINI: null,
  APIOK_PREDICTIONS: null,
  PENDING_PREDICTION: null,
  APIOK_PREDICTIONS_CREATE: null,
  APIOK_PREDICTION_UPDATE: null,
  APIOK_PREDICTIONS_BYUSER: null,
  APIOK_PREDICTIONS_BYUSER_DICO: null,
  APIOK_PREDICTIONS_BYGAME: null,
  APIOK_PREDICTIONS_BYGAMEANDUSER: null,
  APIOK_MESSAGES: null,
  APIOK_MESSAGE_CREATE: null,

  GAMESTAB_SET_FILTER: null,
  GAMESTAB_SET_SUBFILTER: null,
  GAMEMODAL_SWITCH: null,
});

export default Actions;
