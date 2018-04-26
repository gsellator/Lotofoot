import { navigateAction } from "fluxible-router";
import Actions from "../../constants/Actions";
import ApiUris from "../../constants/ApiUris";
import config from "../../config";
const TIMEOUT = 20000;

export default {
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