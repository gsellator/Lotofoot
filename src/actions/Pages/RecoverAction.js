import { RouteStore, navigateAction } from "fluxible-router";
import Actions from "../../constants/Actions";
import ApiUris from "../../constants/ApiUris";
const TIMEOUT = 20000;


const LoginAction = {
  recoverInit(context, { route }, done) {
    context.dispatch(Actions.RECOVER_INIT, {});
    let endpoint = ApiUris['RecoverTest'].replace(':recovertoken', route.getIn(["params", "recovertoken"]));

    context.service.read("ApiService", { endpoint }, { timeout: TIMEOUT },
      (err, data) => {
        if (err) {
          context.dispatch(Actions.DIALOG_LOGIN_FAILURE, err.message);
          context.dispatch(Actions.RECOVER_INIT_FAILED);
          done();
        }
        done();
      }
    );
  },
  
  recoverUpdate(context, { route, password }, done) {
    context.dispatch(Actions.RECOVER_PENDING);
    let endpoint = ApiUris['RecoverUpdate'].replace(':recovertoken', route.getIn(["params", "recovertoken"]));
    context.service.update("ApiService", { endpoint }, { password }, { timeout: TIMEOUT },
      (err, data) => {
        if (err) {
          context.dispatch(Actions.DIALOG_LOGIN_FAILURE, err.message);
          context.dispatch(Actions.RECOVER_FAILED, '');
          return done();
        }
        context.dispatch(Actions.RECOVER_SUCCESS, '');
        done();
      }
    );
  },
};

export default LoginAction;
