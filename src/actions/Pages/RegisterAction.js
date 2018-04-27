import { navigateAction } from "fluxible-router";
import Actions from "../../constants/Actions";
import ApiUris from "../../constants/ApiUris";
import config from "../../config";
const TIMEOUT = 20000;

export default {
  registerUser(context, { route, recoverToken, username, password }, done) {
    Promise.all([
      context.executeAction(ApiHubAction.flushApi, { action: Actions.RECOVER_PENDING }),
    ])
    .then(() => {
      return Promise.all([
        context.executeAction(ApiHubAction.postApi, { route, view: 'RecoverUpdate', action: Actions.RECOVER_SUCCESS, body: 'grant_type=password&username=' + username + '&password=' + password, isGrant: true }),
      ]);
    })
    .then(() => {
      // Auto login succeded
      const accessToken = context.getStore('LoginStore').getAccessToken();
      const expiresIn = context.getStore('LoginStore').getExpiresIn();

      let expiresDate = new Date();
      expiresDate.setTime(expiresDate.getTime() + (expiresIn * 1000));

      if (config.appEnv === 'prod') {
        context.setCookie(config.cookie, accessToken, {expires: expiresDate, path: '/', secure: true});
      } else {
        context.setCookie(config.cookie, accessToken, {expires: expiresDate, path: '/'});
      }

      done();
    }, (err) => {
      done();
      console.log('recoverUpdate Error : ', err && err.message);
    });
  },
  
  
  
  registerUser(context, { body }, done) {
    context.dispatch(Actions.PENDING_USER_REGISTER);

    let endpoint = ApiUris['UsersRegister'];
    context.service.create("ApiService", { endpoint }, body, { timeout: TIMEOUT },
      (err, data) => {
        context.dispatch(Actions.APIOK_USER_REGISTER);
        if (err && err.output && err.output.error_description) {
          context.dispatch(Actions.DIALOG_SHOW, { error: err.output.error, errorTxt: err.output.error_description });
          return done();
        } else if (err) {
          if (err.message === 'Unauthorized' || err.message === 'Not Found') {
            context.dispatch(Actions.DIALOG_SHOW, { error: 'La connexion a échoué, mot de passe ou identifiant incorrect.', errorTxt: 'La connexion a échoué, mot de passe ou identifiant incorrect.' });
          } else {
            context.dispatch(Actions.DIALOG_SHOW, { error: err.message, errorTxt: err.message });
          }
          return done();
        }

        const accessToken = data.token;
        const user = data.user;
        var expiresDate = new Date();
        expiresDate.setTime(expiresDate.getTime() + (5000000 * 1000));
        context.setCookie(config.cookie, accessToken, {expires: expiresDate, path: '/'})
        context.dispatch(Actions.LOGIN_SUCCESS, accessToken);
        context.dispatch(Actions.LOGIN_UPDATE_CREDENTIALS, user);
        const newroute = context.getStore("RouteStore").makePath('gamesNew');
        context.executeAction(navigateAction, { url: newroute });
        done();
      }
    );
  },
};