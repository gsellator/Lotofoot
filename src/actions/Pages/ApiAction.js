import Actions from "../../constants/Actions";
import ApiUris from "../../constants/ApiUris";
import config from "../../config";
const TIMEOUT = 20000;

const getUri = ({
  route,
  view,
  accessToken,
  userId,
  predictionId,
}) => {
  if (!ApiUris[view])
    return undefined;

  const endpoint = ApiUris[view]
    .replace(':gameId', route.query.game)
    .replace(':predictionId', predictionId || route.params.predictionId)
    .replace(':userId', userId || route.params.userId);

  if (endpoint.includes('?'))
    return endpoint + '&access_token=' + accessToken;
  return endpoint + '?access_token=' + accessToken;
};

export default {
  getUri,

  getApi(context, { route, view, action, url }) {
    return new Promise((resolve, reject) => {
      const accessToken = context.getCookie(config.cookie);
      const userId = context.getStore('LoginStore').getCredentials()._id;
      const endpoint = getUri({
        route,
        view,
        accessToken,
        userId,
      });

      context.service.read("ApiService", { endpoint }, { timeout: TIMEOUT },
        (err, data) => {
          if (err && err.output && err.output.error_description) {
            context.dispatch(Actions.DIALOG_SHOW, { error: err.output.error, errorTxt: err.output.error_description });
            context.dispatch(action, { route, url });
            return resolve();
          } else if (err) {
            context.dispatch(Actions.DIALOG_SHOW, { error: err.message, errorTxt: err.message });
            context.dispatch(action, { route, url });
            return resolve();
          }

          context.dispatch(action, { data, route, url });
          return resolve();
        }
      );
    });
  },

  postApi(context, { route, view, body, action, url }) {
    return new Promise((resolve, reject) => {
      const accessToken = context.getCookie(config.cookie);
      const userId = context.getStore('LoginStore').getCredentials()._id;
      const endpoint = getUri({
        route,
        view,
        accessToken,
        userId,
      });

      context.service.create("ApiService", { endpoint }, body, { timeout: TIMEOUT },
        (err, data) => {
          if (err && err.output && err.output.error_description) {
            context.dispatch(Actions.DIALOG_SHOW, { error: err.output.error, errorTxt: err.output.error_description });
            context.dispatch(action, { route, url });
            return reject();
          } else if (err) {
            context.dispatch(Actions.DIALOG_SHOW, { error: err.message, errorTxt: err.message });
            context.dispatch(action, { route, url });
            return reject();
          }

          context.dispatch(action, { data, route, url });
          return resolve();
        }
      );
    });
  },

  putApi(context, { route, view, body, action, predictionId }) {
    return new Promise((resolve, reject) => {
      const accessToken = context.getCookie(config.cookie);
      const userId = context.getStore('LoginStore').getCredentials()._id;
      const endpoint = getUri({
        route,
        view,
        accessToken,
        userId,
        predictionId,
      });

      context.service.update("ApiService", { endpoint }, body, { timeout: TIMEOUT },
        (err, data) => {
          if (err && err.output && err.output.error_description) {
            context.dispatch(Actions.DIALOG_SHOW, { error: err.output.error, errorTxt: err.output.error_description });
            context.dispatch(action, { route, url });
            return resolve();
          } else if (err) {
            context.dispatch(Actions.DIALOG_SHOW, { error: err.message, errorTxt: err.message });
            context.dispatch(action, { route, url });
            return resolve();
          }

          context.dispatch(action, { data, route, url });
          return resolve();
        }
      );
    })
  },

  flushApi(context, { action, url }) {
    context.dispatch(action, { url });
  },

  emptyApiCall(context, { route, action, url }) {
    context.dispatch(action, { route, url });
  },
};