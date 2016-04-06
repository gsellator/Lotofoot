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
    let endpoint = ApiUris['RecoverInit'].replace(':username', username);
    context.service.update("ApiService", { endpoint }, {}, { timeout: TIMEOUT },
      (err, data) => {
        if (err) {
          context.dispatch(Actions.DIALOG_LOGIN_FAILURE, err.message);
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