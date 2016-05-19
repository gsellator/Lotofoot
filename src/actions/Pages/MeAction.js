import Actions from "../../constants/Actions";
import ApiUris from "../../constants/ApiUris";
import { navigateAction } from "fluxible-router";
const TIMEOUT = 20000;

const MeAction = {
  loadMe(context, {}) {
    return new Promise(function(resolve, reject) {
      const accessToken = context.getCookie('lotofoot_token');
      if (!accessToken){return resolve(context.executeAction(navigateAction, { url: '/login' }));}

      const lastCheck = context.getStore("LoginPageStore").getLastCheck();
      if (lastCheck && lastCheck < 200000)
        return resolve();

      let endpoint = ApiUris['UsersMe'] + '?access_token=' + accessToken;
      context.service.read("ApiService", { endpoint }, { timeout: TIMEOUT }, (err, data) => {
        if (err) {
          if (lastCheck){
            if (err.output) {console.log('Me error', err.output.message);}
            else {console.log('Me error', err.message);}
            return resolve();
          }
          context.executeAction(navigateAction, { url: '/logout' })
          return reject(err);
        }

        return resolve(context.dispatch(Actions.LOGIN_UPDATE_CREDENTIALS, { accessToken, credentials: data }));
      });
    })
  }
};


export default MeAction;
