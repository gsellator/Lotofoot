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
        if (err && err.output) {
          context.dispatch(Actions.DIALOG_SHOW, { error: '', errorTxt: err.output.error_description });
          return done();
        } else if (err) {
          if (err.message === 'Unauthorized' || err.message === 'Not Found') {
            context.dispatch(Actions.DIALOG_SHOW, { error: '', errorTxt: 'La connexion a échoué, mot de passe ou identifiant incorrect.' });
          } else {
            context.dispatch(Actions.DIALOG_SHOW, { error: '', errorTxt: err.message });
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
        const newroute = context.getStore("RouteStore").makePath('gamesNew');
        context.executeAction(navigateAction, { url: newroute });
        done();
      }
    );
  },
};

export default UserRegisterAction;
