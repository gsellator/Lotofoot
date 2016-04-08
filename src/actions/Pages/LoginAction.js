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
          } else if (err.message == '{"code":400,"error":"invalid_client","error_description":"Missing parameters. \\"username\\" and \\"password\\" are required"}') {
            context.dispatch(Actions.DIALOG_LOGIN_FAILURE, 'Veuillez renseigner les deux champs.');
          } else if (err.message == 'erreur :getaddrinfo ENOTFOUND dailyhubapi.herokuapp.com dailyhubapi.herokuapp.com:443') {
            context.dispatch(Actions.DIALOG_LOGIN_FAILURE, 'Erreur lors de l\'authentification. Veuillez réessayer ultérieurement.');
          } else {
            context.dispatch(Actions.DIALOG_LOGIN_FAILURE, err.message);
            done(err);
          }
          return done();
        }

        const accessToken = data.access_token;
        var expiresDate = new Date();
        expiresDate.setTime(expiresDate.getTime() + (data.expires_in * 1000));
        context.setCookie('lotofoot_token', accessToken, {expires: expiresDate})
        context.dispatch(Actions.LOGIN_SUCCESS, accessToken);
        const newroute = context.getStore("RouteStore").makePath('home');
        context.executeAction(navigateAction, { url: newroute });
        done();
      }
    );
  },
};

export default LoginAction;