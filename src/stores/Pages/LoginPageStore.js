import { BaseStore } from "fluxible/addons";
import Actions from "../../constants/Actions";
import moment from "moment";

class LoginPageStore extends BaseStore {
  static storeName = "LoginPageStore"

  static handlers = {
    [Actions.LOGIN_PENDING]: "handlePending",
    [Actions.DIALOG_LOGIN_FAILURE]: "handleLoginFailure",
    [Actions.LOGIN_SUCCESS]: "handleLoginSuccess",
    [Actions.LOGIN_UPDATE_CREDENTIALS]: "handleUpdateCredentials",
  }

  constructor(dispatcher) {
    super(dispatcher);
    moment.locale('fr');
    this.pending = false;
    this.accessToken = '';
    this.credentials = {};
    this.lastCheck;
  }

  handlePending() {
    this.pending = true;
    this.emitChange();
  }

  handleLoginFailure() {
    this.pending = false;
    this.emitChange();
  }

  handleLoginSuccess(accessToken) {
    this.pending = false;
    this.accessToken = accessToken;
    this.emitChange();
  }

  handleUpdateCredentials({ accessToken, credentials }) {
    if (accessToken && credentials) {
      this.accessToken = accessToken;
      this.credentials = credentials;
      this.lastCheck = moment();
    }
    this.emitChange();
  }

  getPending() {return this.pending;}
  getAccessToken() {return this.accessToken;}
  getCredentials() {return this.credentials;}
  getLastCheck() {
    if (this.lastCheck)
      return moment().diff(this.lastCheck);
    return undefined;
  }

  dehydrate() {
    return {
      pending: this.pending,
      accessToken: this.accessToken,
      credentials: this.credentials,
      lastCheck: this.lastCheck.format(),
    };
  }

  rehydrate(state) {
    this.pending = state.pending;
    this.accessToken = state.accessToken;
    this.credentials = state.credentials;
    this.lastCheck = moment(state.lastCheck);
  }
}

export default LoginPageStore;