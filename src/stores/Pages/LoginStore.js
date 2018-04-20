import { BaseStore } from "fluxible/addons";
import Actions from "../../constants/Actions";
import moment from "moment";

class LoginStore extends BaseStore {
  static storeName = "LoginStore"

  static handlers = {
    [Actions.LOGIN_PENDING]: "handlePending",
    [Actions.LOGIN_SUCCESS]: "handleLoginSuccess",
    [Actions.LOGIN_FAILURE]: "handleLoginFailure",
    [Actions.LOGIN_UPDATE_CREDENTIALS]: "handleUpdateCredentials",
  }

  constructor(dispatcher) {
    super(dispatcher);
    moment.locale('fr');
    this.pending = false;
    this.credentials = {};
    this.accessToken = undefined;
    this.lastCheck;
  }

  handlePending() {
    this.pending = true;
    this.emitChange();
  }

  handleLoginSuccess({ data, route, url }) {
    this.pending = false;

    if (data && data.token){
      this.accessToken = data.token;
    }

    this.emitChange();
  }

  handleLoginFailure() {
    this.pending = false;
    this.emitChange();
  }

  handleUpdateCredentials({ accessToken, credentials }) {
    if (accessToken && credentials && (JSON.stringify(credentials) !== JSON.stringify(this.credentials))) {
      this.credentials = credentials;
      this.accessToken = accessToken;
      this.lastCheck = moment();
      this.emitChange();
    }
  }

  getPending() {return this.pending;}
  getCredentials() {return this.credentials && this.credentials._id ? this.credentials : { _id: undefined };}
  getAccessToken() {return this.accessToken;}
  getLastCheck() {
    if (this.lastCheck)
      return moment().diff(this.lastCheck);
    return undefined;
  }

  dehydrate() {
    return {
      pending: this.pending,
      credentials: this.credentials,
      accessToken: this.accessToken,
      lastCheck: this.lastCheck.format(),
    };
  }

  rehydrate(state) {
    this.pending = state.pending;
    this.credentials = state.credentials;
    this.accessToken = state.accessToken;
    this.lastCheck = moment(state.lastCheck);
  }
}

export default LoginStore;