// Actions to run when the router matches a route. Used in app/routes.js
import Actions from "../constants/Actions";
import MeAction from "../actions/Pages/MeAction";
import ApiAction from "../actions/Pages/ApiAction";

const InitActions = {
  recoverInit(context, route, done) {
    Promise.all([
      context.executeAction(ApiAction.flushApi, { action: Actions.RECOVERINIT_INIT }),
    ])
    .then(() => {
      done();
    }, (err) => {
      done();
      console.log('InitActions Error : ', err.message);
    });
  },

  recover(context, route, done) {
    Promise.all([
      context.executeAction(ApiAction.getApi, { route, view: 'RecoverTest', action: Actions.RECOVER_INIT_OK }),
    ])
    .then(() => {
      done();
    }, (err) => {
      done();
      console.log('InitActions Error : ', err.message);
    });
  },

  register(context, route, done) {
    Promise.all([
      context.executeAction(ApiAction.flushApi, { action: Actions.REGISTER_INIT }),
    ])
    .then(() => {
      done();
    }, (err) => {
      done();
      console.log('InitActions Error : ', err.message);
    });
  },

  me(context, route, done) {
    context.executeAction(MeAction.loadMe, {})
    .then(() => {
      done();
    }, (err) => {
      done();
      console.log('InitActions Error : ', err.message);
    });
  },

  game(context, route, done) {
    context.executeAction(MeAction.loadMe, {})
    .then(() => {
      return Promise.all([
        context.executeAction(ApiAction.getApi, { route, view: 'Game', action: Actions.APIOK_GAME }),
        context.executeAction(ApiAction.getApi, { route, view: 'PredictionsByGameAndUser', action: Actions.APIOK_PREDICTIONS_BYGAMEANDUSER }),

        context.executeAction(ApiAction.getApi, { route, view: 'Teams', action: Actions.APIOK_TEAMS }),
        context.executeAction(ApiAction.getApi, { route, view: 'Users', action: Actions.APIOK_USERS }),
        context.executeAction(ApiAction.getApi, { route, view: 'PredictionsByGame', action: Actions.APIOK_PREDICTIONS_BYGAME }),
      ]);
    })
    .then(() => {
      done();
    }, (err) => {
      done();
      console.log('InitActions Error : ', err.message);
    });
  },
};

export default InitActions;
