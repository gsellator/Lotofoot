import { navigateAction } from "fluxible-router";
import Actions from "../../constants/Actions";
import ApiUris from "../../constants/ApiUris";
const TIMEOUT = 20000;

const LoginAction = {
  loginUser(context, { username, password }, done) {
    context.dispatch(Actions.LOGIN_PENDING);

    let endpoint = ApiUris['UsersLogin'];
    context.service.create("ApiService", { endpoint }, { email: username, password: password }, { timeout: TIMEOUT },
      (err, data) => {
        if (err) {
          let errObject = JSON.parse(err.message);
          let errMsg = errObject ? errObject.message : 'err.message';
          if (errMsg === 'Unauthorized' || errMsg === 'Not Found') {
            context.dispatch(Actions.DIALOG_LOGIN_FAILURE, 'La connexion a échoué, mot de passe ou identifiant incorrect.');
          } else if (errMsg === '"email" is not allowed to be empty. "email" must be a valid email' ||
        errMsg === '"password" is not allowed to be empty. "password" length must be at least 3 characters long' ||
        errMsg === '"email" is not allowed to be empty. "email" must be a valid email and "password" is not allowed to be empty. "password" length must be at least 3 characters long') {
            context.dispatch(Actions.DIALOG_LOGIN_FAILURE, 'Veuillez renseigner les deux champs.');
          } else {
            context.dispatch(Actions.DIALOG_LOGIN_FAILURE, errMsg);
          }
          return done();
        }

        const accessToken = data.token;
        var expiresDate = new Date();
        expiresDate.setTime(expiresDate.getTime() + (5000000 * 1000));
        context.setCookie('lotofoot_token', accessToken, {expires: expiresDate, path: '/'})
        context.dispatch(Actions.LOGIN_SUCCESS, accessToken);
        const newroute = context.getStore("RouteStore").makePath('home');
        context.executeAction(navigateAction, { url: newroute });
        done();
      }
    );
  },
};

export default LoginAction;
