import { navigateAction } from "fluxible-router";

import ApiAction from "../../actions/Pages/ApiAction";
import Actions from "../../constants/Actions";
import ApiUris from "../../constants/ApiUris";
import config from "../../config";

export default {
  login(context, { route, email, password }, done) {
    Promise.all([
      context.executeAction(ApiAction.flushApi, { action: Actions.LOGIN_PENDING }),
    ])
    .then(() => {
      return Promise.all([
        context.executeAction(ApiAction.postApi, { route, view: 'UsersLogin', action: Actions.LOGIN_SUCCESS, body: { username: email, password } }),
      ]);
    })
    .then(() => {
      // Auto login succeded
      const accessToken = context.getStore('LoginStore').getAccessToken();

      let expiresDate = new Date();
      expiresDate.setTime(expiresDate.getTime() + (5000000 * 1000));

      if (config.appEnv === 'prod') {
        context.setCookie(config.cookie, accessToken, {expires: expiresDate, path: '/', secure: true});
      } else {
        context.setCookie(config.cookie, accessToken, {expires: expiresDate, path: '/'});
      }

      const newroute = context.getStore("RouteStore").makePath('home');
      context.executeAction(navigateAction, { url: newroute });

      done();
    }, (err) => {
      context.dispatch(Actions.LOGIN_FAILURE);
      done();
      console.log('loginUser Error : ', err && err.message);
    });
  },

  logout(context, { route }, done) {
    window.location.href = "/logout";
    done();

    // API missing
    //    Promise.all([
    //      context.executeAction(ApiAction.postApi, { route, view: 'UsersLogout', action: Actions.LOGOUT_SUCCESS }),
    //    ])
    //    .then(() => {
    //      window.location.href = "/logout";
    //      done();
    //    }, (err) => {
    //      done();
    //      console.log('loginUser Error : ', err && err.message);
    //    });
  },
};