// Actions to run when the router matches a route. Used in app/routes.js
import Actions from "../constants/Actions";
import { loadMe } from "../actions/Pages/MeAction";
import { getApi } from "../actions/Pages/ApiAction";
import { recoverInitInit } from "../actions/Pages/RecoverInitAction";
import { recoverInit } from "../actions/Pages/RecoverAction";

//context.executeAction(getApi, { route, view: 'UsersRegister', action: Actions.APIOK_USERS_REGISTER }),
//  context.executeAction(getApi, { route, view: 'PredictionsByGame', action: Actions.APIOK_PREDICTIONS_BYGAME }),
//  context.executeAction(getApi, { route, view: 'PredictionsByUser', action: Actions.APIOK_PREDICTIONS_BYUSER }),

const InitActions = {
  recoverInit(context, route, done) {
    Promise.all([
      context.executeAction(recoverInitInit, {}),
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
      context.executeAction(recoverInit, { route }),
      context.executeAction(getApi, { route, view: 'PublicApps', action: Actions.APIOK_PUBLIC_APPS }),
    ])
      .then(() => {
      done();
    }, (err) => {
      done();
      console.log('InitActions Error : ', err.message);
    });
  },

  home(context, route, done) {
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

  games(context, route, done) {
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

  predictions(context, route, done) {
    Promise.all([
      context.executeAction(loadMe, {}),
      context.executeAction(getApi, { route, view: 'Predictions', action: Actions.APIOK_PREDICTIONS }),
    ])
      .then(() => {
      done();
    }, (err) => {
      done();
      console.log('InitActions Error : ', err.message);
    });
  },

  ranking(context, route, done) {
    Promise.all([
      context.executeAction(getApi, { route, view: 'Users', action: Actions.APIOK_USERS }),
    ])
      .then(() => {
      done();
    }, (err) => {
      done();
      console.log('InitActions Error : ', err.message);
    });
  },

  help(context, route, done) {
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
