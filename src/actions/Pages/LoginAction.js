import { navigateAction } from "fluxible-router";
import Actions from "../../constants/Actions";
import ApiUris from "../../constants/ApiUris";
const TIMEOUT = 20000;

const LoginAction = {
  loginUser(context, { username, password }, done) {
    context.dispatch(Actions.LOGIN_PENDING);

    let endpoint = ApiUris['UsersLogin'];
    context.service.create("ApiService", { endpoint }, { username: username, password: password }, { timeout: TIMEOUT },
      (err, data) => {
        if (err && err.output && err.output.error_description) {
          context.dispatch(Actions.DIALOG_LOGIN_FAILURE, { error: err.output.error, errorTxt: err.output.error_description });
          return done();
        } else if (err) {
          if (err.message === 'Unauthorized' || err.message === 'Not Found') {
            context.dispatch(Actions.DIALOG_LOGIN_FAILURE, { error: 'La connexion a échoué, mot de passe ou identifiant incorrect.', errorTxt: 'La connexion a échoué, mot de passe ou identifiant incorrect.' });
          } else {
            context.dispatch(Actions.DIALOG_LOGIN_FAILURE, { error: err.message, errorTxt: err.message });
          }
          return done();
        }

        const accessToken = data.token;
        var expiresDate = new Date();
        expiresDate.setTime(expiresDate.getTime() + (5000000 * 1000));
        context.setCookie('lotofoot_token', accessToken, {expires: expiresDate, path: '/'})
        context.dispatch(Actions.LOGIN_SUCCESS, accessToken);
        const newroute = context.getStore("RouteStore").makePath('games');
        context.executeAction(navigateAction, { url: newroute });
        done();
      }
    );
  },
};

export default LoginAction;
