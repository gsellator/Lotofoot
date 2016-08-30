import { RouteStore, navigateAction } from "fluxible-router";
import Actions from "../../constants/Actions";
import ApiUris from "../../constants/ApiUris";
const TIMEOUT = 20000;


const RecoverAction = {
  recoverInit(context, { route }, done) {
    context.dispatch(Actions.RECOVER_INIT, {});
    let endpoint = ApiUris['RecoverTest'].replace(':recovertoken', route.params.recovertoken);

    context.service.read("ApiService", { endpoint }, { timeout: TIMEOUT },
      (err, data) => {
        if (err && err.output) {
          console.log('RecoverAction > recoverInit Error', err.output.error_description);
          context.dispatch(Actions.DIALOG_SHOW, 'Ce lien n\'est plus valide, demandez-en un nouveau !');
          context.dispatch(Actions.RECOVER_INIT_FAILED);
          done();
        } else if (err) {
          console.log('RecoverAction > recoverInit Error', err.message);
          context.dispatch(Actions.DIALOG_SHOW, 'Ce lien n\'est plus valide, demandez-en un nouveau !');
          context.dispatch(Actions.RECOVER_INIT_FAILED);
          done();
        }

        done();
      }
    );
  },

  recoverUpdate(context, { route, password }, done) {
    context.dispatch(Actions.RECOVER_PENDING);
    let endpoint = ApiUris['RecoverUpdate'].replace(':recovertoken', route.params.recovertoken);
    context.service.create("ApiService", { endpoint }, { password }, { timeout: TIMEOUT },
      (err, data) => {
        if (err && err.output) {
          console.log('RecoverAction > recoverUpdate Error', err.output.error_description);
          context.dispatch(Actions.DIALOG_SHOW, 'Une erreur est survenue lors du changement de votre mot de passe, veuillez réessayer.');
          context.dispatch(Actions.RECOVER_FAILED, '');
          done();
        } else if (err) {
          console.log('RecoverAction > recoverUpdate Error', err.message);
          context.dispatch(Actions.DIALOG_SHOW, 'Une erreur est survenue lors du changement de votre mot de passe, veuillez réessayer.');
          context.dispatch(Actions.RECOVER_FAILED, '');
          done();
        }

        context.dispatch(Actions.RECOVER_SUCCESS, '');
        const accessToken = data.token;
        const user = data.user;
        var expiresDate = new Date();
        expiresDate.setTime(expiresDate.getTime() + (5000000 * 1000));
        context.setCookie('lotofoot_token', accessToken, {expires: expiresDate, path: '/'})
        context.dispatch(Actions.LOGIN_SUCCESS, accessToken);
        context.dispatch(Actions.LOGIN_UPDATE_CREDENTIALS, user);
        done();
      }
    );
  },
};

export default RecoverAction;
