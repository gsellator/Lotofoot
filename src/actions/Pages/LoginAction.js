import { navigateAction } from "fluxible-router";
import Actions from "../../constants/Actions";
const TIMEOUT = 20000;

const LoginAction = {
  loginUser(context, { username, password }, done) {
    context.dispatch(Actions.LOGIN_PENDING);
    context.service.read("LoginService", { username, password }, { timeout: TIMEOUT },
      (err, data) => {
        if (err) {
          if (err.message === 'XMLHttpRequest timeout') {
            console.log('LoginService timeout');
            context.dispatch(Actions.DIALOG_LOGIN_FAILURE, err.message);
          } else {
            context.dispatch(Actions.DIALOG_LOGIN_FAILURE, err.message);
            done(err);
          }
          return done();
        }

        const accessToken = data.access_token;
        var expiresDate = new Date();
        expiresDate.setTime(expiresDate.getTime() + (data.expires_in * 1000));
        context.setCookie('dld_authentication', accessToken, {expires: expiresDate})
        context.dispatch(Actions.LOGIN_SUCCESS, accessToken);
        const newroute = context.getStore("RouteStore").makePath('hub');
        context.executeAction(navigateAction, { url: newroute });
        done();
      }
    );
  },
};

export default LoginAction;