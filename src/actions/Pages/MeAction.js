import Actions from "../../constants/Actions";
import ApiUris from "../../constants/ApiUris";
import { navigateAction } from "fluxible-router";
const TIMEOUT = 20000;

const MeAction = {
  loadMe(context, {}) {
    return new Promise((resolve, reject) => {
      const accessToken = context.getCookie('lotofoot_token');
      const route = context.getStore("RouteStore").getCurrentRoute();

      if (!accessToken){
        context.executeAction(navigateAction, { url: '/login' });
      }

      let endpoint = ApiUris['UsersMe'] + '?access_token=' + accessToken;

      context.service.read("ApiService", { endpoint }, { timeout: TIMEOUT }, (err, data) => {
        if (err) {
          if (err.statusCode === 401) {
            context.executeAction(navigateAction, { url: '/logout' })
            reject(err);
          } else if (err.message === 'XMLHttpRequest timeout') {
            console.log('MeService timeout');
            const currentCredentials = context.getStore("LoginPageStore").getCredentials();
            if (!currentCredentials.role){
              context.executeAction(navigateAction, { url: '/logout' })
              reject(err);
            }
          } else {
            context.executeAction(navigateAction, { url: '/logout' })
            reject(err);
          }
          return resolve();
        }

        // There user is logged, acces to the login page is forbidden
        if (route.get('path') == '/login') {
          context.executeAction(navigateAction, { url: '/' })
        } else {
          context.dispatch(Actions.LOGIN_UPDATE_CREDENTIALS, data);
        }

        resolve();
      });

    })
  }
};

export default MeAction;
