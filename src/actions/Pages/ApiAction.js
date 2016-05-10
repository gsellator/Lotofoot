import Actions from "../../constants/Actions";
import ApiUris from "../../constants/ApiUris";
import config from "../../config";
import _ from 'lodash';
const TIMEOUT = 20000;

const ApiAction = {
  getApi(context, { route, view, action }, done) {
    const accessToken = context.getCookie('lotofoot_token');
    const userId = context.getStore('LoginPageStore').getCredentials()._id;

    const gameId = _.isUndefined(route) ? null : route.getIn(["params", "gameId"]);
    const predictionId = _.isUndefined(route) ? null : route.getIn(["params", "predictionId"]);

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
        if (err) {
          context.dispatch(Actions.DIALOG_LOGIN_FAILURE, err.message);
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
    .replace(':gameId', route.getIn(["params", "gameId"]))
    .replace(':predictionId', route.getIn(["params", "predictionId"]))
    .replace(':userId', route.getIn(["params", "userId"]));

    if (accessToken && endpoint.includes('?'))
      endpoint = endpoint + '&access_token=' + accessToken;
    else if (accessToken)
      endpoint = endpoint + '?access_token=' + accessToken;

    context.service.create("ApiService", { endpoint }, body, { timeout: TIMEOUT },
      (err, data) => {
        if (err) {
          context.dispatch(Actions.DIALOG_LOGIN_FAILURE, err.message);
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
    .replace(':gameId', route.getIn(["params", "gameId"]))
    .replace(':predictionId', predictionId || route.getIn(["params", "predictionId"]))
    .replace(':userId', route.getIn(["params", "userId"]));

    if (accessToken && endpoint.includes('?'))
      endpoint = endpoint + '&access_token=' + accessToken;
    else if (accessToken)
      endpoint = endpoint + '?access_token=' + accessToken;

    context.service.update("ApiService", { endpoint }, body, { timeout: TIMEOUT },
      (err, data) => {
        if (err) {
          context.dispatch(Actions.DIALOG_LOGIN_FAILURE, err.message);
          return done();
        }
        context.dispatch(action, { data, route });
        return done();
      }
    );
  },
};

export default ApiAction;
