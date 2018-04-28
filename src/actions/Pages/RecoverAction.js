import ApiAction from "../../actions/Pages/ApiAction";
import Actions from "../../constants/Actions";
import config from "../../config";

export default {
  recoverInitSend(context, { route, email }, done) {
    return Promise.all([
      context.executeAction(ApiAction.flushApi, { action: Actions.RECOVERINIT_PENDING }),
    ])
    .then(() => {
      return Promise.all([
        context.executeAction(ApiAction.postApi, { route, view: 'RecoverInit', body: { email }, action: Actions.RECOVERINIT_SUCCESS }),
      ]);
    })
    .then(() => {
      done();
    }, (err) => {
      done();
      console.log('recoverInitSend Error : ', err && err.message);
    });
  },

  recoverUpdate(context, { route, recoverToken, email, password }, done) {
    Promise.all([
      context.executeAction(ApiAction.flushApi, { action: Actions.RECOVER_PENDING }),
    ])
    .then(() => {
      return Promise.all([
        context.executeAction(ApiAction.postApi, { route, view: 'RecoverUpdate', action: Actions.RECOVER_SUCCESS, body: { password }, isGrant: true }),
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
      done();
      console.log('recoverUpdate Error : ', err && err.message);
    });
  },
};