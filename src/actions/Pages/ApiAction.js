import Actions from "../../constants/Actions";
import ApiUris from "../../constants/ApiUris";
import _ from 'lodash';
import immutable from 'immutable';
const TIMEOUT = 20000;

const ApiAction = {
  getApi(context, { route, view, action }, done) {
    const accessToken = context.getCookie('lotofoot_token');
    const userId = context.getStore('LoginPageStore').getCredentials()._id;

    const gameId = route.query.game;
    const predictionId = route.params.predictionId;

    let endpoint = ApiUris[view]
    .replace(':gameId', gameId)
    .replace(':predictionId', predictionId)
    .replace(':userId', userId);

    if (accessToken && endpoint.includes('?'))
      endpoint = endpoint + '&access_token=' + accessToken;
    else if (accessToken)
      endpoint = endpoint + '?access_token=' + accessToken;

    context.service.read("ApiService", { endpoint }, { timeout: TIMEOUT },
      (err, data) => {
        if (err && err.output) {
          context.dispatch(Actions.DIALOG_SHOW, err.output.error_description);
          return done();
        } else if (err) {
          context.dispatch(Actions.DIALOG_SHOW, err.message);
          return done();
        }

        context.dispatch(action, { data, route });
        return done();
      }
    );
  },

  postApi(context, { route, view, body, action }, done) {
    const accessToken = context.getCookie('lotofoot_token');
    let endpoint = ApiUris[view]
    .replace(':gameId', route.params.gameId)
    .replace(':predictionId', route.params.predictionId)
    .replace(':userId', route.params.userId);

    if (accessToken && endpoint.includes('?'))
      endpoint = endpoint + '&access_token=' + accessToken;
    else if (accessToken)
      endpoint = endpoint + '?access_token=' + accessToken;

    context.service.create("ApiService", { endpoint }, body, { timeout: TIMEOUT },
      (err, data) => {
        if (err && err.output) {
          context.dispatch(Actions.DIALOG_SHOW, err.output.error_description);
          return done();
        } else if (err) {
          context.dispatch(Actions.DIALOG_SHOW, err.message);
          return done();
        }

        context.dispatch(action, { data, route });
        return done();
      }
    );
  },

  putApi(context, { route, view, body, action, predictionId }, done) {
    const accessToken = context.getCookie('lotofoot_token');
    let endpoint = ApiUris[view]
    .replace(':gameId', route.params.gameId)
    .replace(':predictionId', predictionId || route.params.predictionId)
    .replace(':userId', route.params.userId);

    if (accessToken && endpoint.includes('?'))
      endpoint = endpoint + '&access_token=' + accessToken;
    else if (accessToken)
      endpoint = endpoint + '?access_token=' + accessToken;

    context.service.update("ApiService", { endpoint }, body, { timeout: TIMEOUT },
      (err, data) => {
        if (err && err.output) {
          context.dispatch(Actions.DIALOG_SHOW, err.output.error_description);
          return done();
        } else if (err && err.body) {
          context.dispatch(Actions.DIALOG_SHOW, err.body.error_description);
          return done();
        } else if (err) {
          context.dispatch(Actions.DIALOG_SHOW, err.message);
          return done();
        }

        context.dispatch(action, { data, route });
        return done();
      }
    );
  },
};

export default ApiAction;
