// Actions to run when the router matches a route. Used in app/routes.js
import Actions from "../constants/Actions";
import { loadMe } from "../actions/Pages/MeAction";

const InitActions = {
  hub(context, route, done) {
    Promise.all([
      context.executeAction(loadMe, {}),
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
