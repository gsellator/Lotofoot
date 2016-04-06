import Actions from "../../constants/Actions";
import { navigateAction } from "fluxible-router";
const TIMEOUT = 20000;

const ContextAction = {
  loadMe(context, {}) {
    return new Promise(function(resolve, reject) {
      const accessToken = context.getCookie('dld_authentication');
      const route = context.getStore("RouteStore").getCurrentRoute();

      if (!accessToken){
        context.executeAction(navigateAction, { url: '/' });
      }

      context.service.read("MeService", { accessToken }, { timeout: TIMEOUT }, (err, data) => {
        if (err) {
          if (err.statusCode === 401) {
            context.executeAction(navigateAction, { url: '/logout' })
            reject(err);
          } else if (err.message === 'XMLHttpRequest timeout') {
            console.log('MeService timeout');
            const currentCredentials = context.getStore("LoginStore").getCredentials();
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
        if (route.get('path') == '/') {
          context.executeAction(navigateAction, { url: '/' })
        } else {
          context.dispatch(Actions.LOGIN_UPDATE_CREDENTIALS, data);
        }

        resolve();
      });

    })
  }
};

export default ContextAction;
