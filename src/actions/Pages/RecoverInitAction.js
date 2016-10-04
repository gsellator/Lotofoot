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
        if (err && err.output) {
          console.log('recoverInitSend Error', err.output.error_description);
          context.dispatch(Actions.DIALOG_SHOW, { error: '', errorTxt: 'L\'email que vous avez indiqué est incorrect' });
          context.dispatch(Actions.RECOVERINIT_FAILED, username);
          done();
        } else if (err) {
          console.log('recoverInitSend Error', err.message);
          context.dispatch(Actions.DIALOG_SHOW, { error: '', errorTxt: 'L\'email que vous avez indiqué est incorrect' });
          context.dispatch(Actions.RECOVERINIT_FAILED, username);
          done();
        }

        context.dispatch(Actions.RECOVERINIT_SUCCESS, username);
        done();
      }
    );
  },
};

export default LoginAction;
