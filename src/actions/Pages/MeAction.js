import { navigateAction } from "fluxible-router";
import Actions from "../../constants/Actions";
import ApiUris from "../../constants/ApiUris";
import config from "../../config";
const TIMEOUT = 20000;

export default {
  loadMe(context, {}) {
    return new Promise((resolve, reject) => {
      const accessToken = context.getCookie(config.cookie);
      if (!accessToken){return resolve(context.executeAction(navigateAction, { url: '/login' }));}

      const lastCheck = context.getStore("LoginStore").getLastCheck();
      if (lastCheck && lastCheck < 200000)
        return resolve();

      let endpoint = ApiUris['UsersMe'] + '?access_token=' + accessToken;
      context.service.read("ApiService", { endpoint }, { timeout: TIMEOUT }, (err, data) => {
        if (err && err.output && err.output.error_description) {
          if (lastCheck){
            console.log('Me error', err.output.error_description);
            return resolve();
          } else {
            context.executeAction(navigateAction, { url: '/logout' })
            return reject(err);
          }
        } else if (err) {
          if (lastCheck){
            console.log('Me error', err && err.message);
            return resolve();
          } else {
            context.executeAction(navigateAction, { url: '/logout' })
            return reject(err);
          }
        }

        return resolve(context.dispatch(Actions.LOGIN_UPDATE_CREDENTIALS, { accessToken, credentials: data }));
      });
    })
  }
};