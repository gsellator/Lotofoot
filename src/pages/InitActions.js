// Actions to run when the router matches a route. Used in app/routes.js
import Actions from "../constants/Actions";
import { loadMe } from "../actions/Pages/MeAction";
import { getApi } from "../actions/Pages/ApiAction";

const InitActions = {
  hub(context, route, done) {
    Promise.all([
      context.executeAction(loadMe, {}),
      context.executeAction(getApi, { route, view: 'Games', action: Actions.APIOK_GAMES }),
    ])
    .then(() => {
      done();
    }, (err) => {
      done();
      console.log('InitActions Error : ', err.message);
    });
  },
};

export default InitActions;
