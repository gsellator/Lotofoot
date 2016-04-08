import { navigateAction } from "fluxible-router";
import Actions from "../../constants/Actions";
import ApiUris from "../../constants/ApiUris";
const TIMEOUT = 20000;

const LoginAction = {
  loginUser(context, { username, password }, done) {
    context.dispatch(Actions.LOGIN_PENDING);

    let endpoint = ApiUris['UsersLogin'];
    context.service.update("ApiService", { endpoint }, { email: username, password: password }, { timeout: TIMEOUT },
      (err, data) => {
        if (err) {
          if (err.message === '{"message":"Unauthorized","stack":{}}') {
            context.dispatch(Actions.DIALOG_LOGIN_FAILURE, 'La connexion a échoué, mot de passe ou identifiant incorrect.');
          } else if (err.message === '{"message":"\\"email\\" is not allowed to be empty. \\"email\\" must be a valid email","stack":{}}' ||
        err.message === '{"message":"\\"password\\" is not allowed to be empty. \\"password\\" length must be at least 3 characters long","stack":{}}' ||
        err.message === '{"message":"\\"email\\" is not allowed to be empty. \\"email\\" must be a valid email and \\"password\\" is not allowed to be empty. \\"password\\" length must be at least 3 characters long","stack":{}}') {
            context.dispatch(Actions.DIALOG_LOGIN_FAILURE, 'Veuillez renseigner les deux champs.');
          } else {
            context.dispatch(Actions.DIALOG_LOGIN_FAILURE, err.message);
          }
          return done();
        }

        const accessToken = data.token;
        const user = data.user;
        var expiresDate = new Date();
        expiresDate.setTime(expiresDate.getTime() + (data.expires_in * 1000));
        context.setCookie('lotofoot_token', accessToken, {expires: expiresDate})
        context.dispatch(Actions.LOGIN_SUCCESS, accessToken);
        context.dispatch(Actions.LOGIN_UPDATE_CREDENTIALS, user);
        const newroute = context.getStore("RouteStore").makePath('home');
        context.executeAction(navigateAction, { url: newroute });
        done();
      }
    );
  },
};

export default LoginAction;
