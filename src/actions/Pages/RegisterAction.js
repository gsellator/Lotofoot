import ApiAction from "../../actions/Pages/ApiAction";
import Actions from "../../constants/Actions";
import config from "../../config";


export default {
  registerUser(context, { route, email, password, firstname, lastname }, done) {
    Promise.all([
      context.executeAction(ApiAction.flushApi, { action: Actions.REGISTER_PENDING }),
    ])
    .then(() => {
      const body = {
        email,
        username: email,
        password,
        firstName: firstname,
        lastName: lastname,
      };
      return Promise.all([
        context.executeAction(ApiAction.postApi, { route, view: 'UsersRegister', action: Actions.REGISTER_SUCCESS, body }),
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

      done();
    }, (err) => {
      context.dispatch(Actions.REGISTER_FAILURE);
      done();
      console.log('registerUser Error : ', err && err.message);
    });
  },
};