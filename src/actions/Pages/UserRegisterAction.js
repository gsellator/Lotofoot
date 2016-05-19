import { navigateAction } from "fluxible-router";
import Actions from "../../constants/Actions";
import ApiUris from "../../constants/ApiUris";
const TIMEOUT = 20000;

const UserRegisterAction = {
  registerUser(context, { body }, done) {
    context.dispatch(Actions.PENDING_USER_REGISTER);

    let endpoint = ApiUris['UsersRegister'];
    context.service.create("ApiService", { endpoint }, body, { timeout: TIMEOUT },
      (err, data) => {
        context.dispatch(Actions.APIOK_USER_REGISTER);
        if (err) {
          let errObject = JSON.parse(err.message);
          let errMsg = errObject ? errObject.message : 'err.message';
          if (errMsg === 'Unauthorized' || errMsg === 'Not Found') {
            context.dispatch(Actions.DIALOG_SHOW, 'La connexion a échoué, mot de passe ou identifiant incorrect.');
          } else {
            context.dispatch(Actions.DIALOG_SHOW, errMsg);
          }
          return done();
        }
        const accessToken = data.token;
        const user = data.user;
        var expiresDate = new Date();
        expiresDate.setTime(expiresDate.getTime() + (5000000 * 1000));
        context.setCookie('lotofoot_token', accessToken, {expires: expiresDate, path: '/'})
        context.dispatch(Actions.LOGIN_SUCCESS, accessToken);
        context.dispatch(Actions.LOGIN_UPDATE_CREDENTIALS, user);
        const newroute = context.getStore("RouteStore").makePath('homeNew');
        context.executeAction(navigateAction, { url: newroute });
        done();
      }
    );
  },
};

export default UserRegisterAction;
