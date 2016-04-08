import Actions from "../../constants/Actions";
import ApiUris from "../../constants/ApiUris";
import config from "../../config";
const TIMEOUT = 20000;

const ApiAction = {
  getApi(context, { route, view, action }, done) {
    const accessToken = context.getCookie('lotofoot_token');
    let endpoint = ApiUris[view];
//      .replace(':app', route.getIn(["params", "app"]))
//      .replace(':group', route.getIn(["params", "group"]))
//      .replace(':username', route.getIn(["params", "username"]));
    
    if (accessToken)
      endpoint = endpoint + '?access_token=' + accessToken;

    context.service.read("ApiService", { endpoint }, { timeout: TIMEOUT },
      (err, data) => {
        if (err) {
          context.dispatch(Actions.DIALOG_LOGIN_FAILURE, err.message);
          return done();
        }
        context.dispatch(action, { data, route });
        done();
      }
    );
  },
};

export default ApiAction;
