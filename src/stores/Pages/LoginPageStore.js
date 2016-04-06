import { BaseStore } from "fluxible/addons";
import Actions from "../../constants/Actions";

class LoginPageStore extends BaseStore {
  static storeName = "LoginPageStore"

  static handlers = {
    [Actions.LOGIN_PENDING]: "handlePending",
    [Actions.LOGIN_SUCCESS]: "handleLoginSuccess",
    [Actions.DIALOG_LOGIN_FAILURE]: "handleLoginFailure",
    [Actions.LOGIN_COOKIE_FOUND]: "handleCookieFound",
    [Actions.LOGIN_UPDATE_CREDENTIALS]: "handleUpdateCredentials",
    [Actions.LOGOUT_SUCCESS]: "handleLogoutSuccess"
  }

  constructor(dispatcher) {
    super(dispatcher);

    this.pending = false;
    this.isLogged = false;
    this.accessToken = '';
    this.credentials = {};
  }

  handlePending() {
    this.pending = true;
    this.emitChange();
  }

  handleLoginSuccess(access_token) {
    this.pending = false;
    this.isLogged = true;
    this.accessToken = access_token;
    this.emitChange();
  }

  handleLoginFailure() {
    this.pending = false;
    this.emitChange();
  }

  handleCookieFound({ accessToken, credentials }) {
    this.isLogged = true;
    this.accessToken = accessToken;
    this.credentials = credentials;
    this.emitChange();
  }

  handleUpdateCredentials(credentials) {
    if (credentials)
      this.credentials = credentials;
    this.emitChange();
  }

  handleLogoutSuccess() {
    this.isLogged = false;
    this.accessToken = null;
    this.emitChange();
  }

  getPending() {
    return this.pending;
  }

  isLoggedIn() {
    return this.isLogged;
  }

  getAccessToken() {
    return this.accessToken;
  }

  getCredentials() {
    return this.credentials;
  }

  getAccessLevels(level) {
    switch(level) {
      case 'admin':
        if (this.credentials.role === 'admin') {return true;}
        return false;
        break;
      case 'mkt':
        if (this.credentials.role === 'admin' || this.credentials.role === 'mkt') {return true;}
        return false;
        break;
      case 'cxo':
        if (this.credentials.role === 'admin' || this.credentials.role === 'mkt' || this.credentials.role === 'cxo') {return true;}
        return false;
        break;
      case 'standard':
        return true;
        break;
      default:
        return true;
    }
  }

  dehydrate() {
    return {
      pending: this.pending,
      isLogged: this.isLogged,
      accessToken: this.accessToken,
      credentials: this.credentials
    };
  }

  rehydrate(state) {
    this.pending = state.pending;
    this.isLogged = state.isLogged;
    this.accessToken = state.accessToken;
    this.credentials = state.credentials;
  }
}

export default LoginPageStore;

//application
//company
//email
//firstname
//group
//hasKantar
//hasKantarVideo
//hasMediametrie
//hasPlurimedia
//hasSeevibes
//isAdvertiser
//lastname
//role
//username