import { RouteStore, navigateAction } from "fluxible-router";
import Actions from "../../constants/Actions";
import ApiUris from "../../constants/ApiUris";
const TIMEOUT = 20000;


const LoginAction = {
  recoverInitInit(context, { username }, done) {
    context.dispatch(Actions.RECOVERINIT_INIT, {});
    done();
  },

  recoverInitSend(context, { username }, done) {
    context.dispatch(Actions.RECOVERINIT_PENDING);
    let endpoint = ApiUris['RecoverInit'];
    context.service.create("ApiService", { endpoint }, { email: username }, { timeout: TIMEOUT },
      (err, data) => {
        if (err) {
          context.dispatch(Actions.DIALOG_LOGIN_FAILURE, 'L\'email que vous avez indiqué est incorrect');
          context.dispatch(Actions.RECOVERINIT_FAILED, username);
          return done();
        }
        context.dispatch(Actions.RECOVERINIT_SUCCESS, username);
        done();
      }
    );
  },
};

export default LoginAction;
