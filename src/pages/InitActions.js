// Actions to run when the router matches a route. Used in app/routes.js
import Actions from "../constants/Actions";
import MeAction from "../actions/Pages/MeAction";
import ApiAction from "../actions/Pages/ApiAction";

const getRef = (context, route) => {
  return Promise.all([
    context.executeAction(MeAction.loadMe, {}),
    context.executeAction(ApiAction.getApi, { route, view: 'GamesNext', action: Actions.APIOK_GAMES_NEXTMINI }),
  ]);
};

const getModal = (context, route) => {
  return new Promise((resolve, reject) => {
    if (!route.query.game)
      return resolve();

    Promise.all([
      context.executeAction(ApiAction.getApi, { route, view: 'Game', action: Actions.APIOK_GAME }),
      context.executeAction(ApiAction.getApi, { route, view: 'PredictionsByGameAndUser', action: Actions.APIOK_PREDICTIONS_BYGAMEANDUSER }),

      context.executeAction(ApiAction.getApi, { route, view: 'Teams', action: Actions.APIOK_TEAMS }),
      context.executeAction(ApiAction.getApi, { route, view: 'Users', action: Actions.APIOK_USERS }),
      context.executeAction(ApiAction.getApi, { route, view: 'PredictionsByGame', action: Actions.APIOK_PREDICTIONS_BYGAME }),
    ])
    .then(() => {
      return resolve();
    });
  });
};

const InitActions = {
  // Private
  getContext(context, route, done) {
    getRef(context, route)
    .then(() => {
      done();
    }, (err) => {
      done();
      console.log('InitActions Error : ', err.message);
    });
  },

  getContextAndModal(context, route, done) {
    getRef(context, route)
    .then(() => {
      return getModal(context, route);
    })
    .then(() => {
      done();
    }, (err) => {
      done();
      console.log('InitActions Error : ', err.message);
    });
  },

  games(context, route, done) {
    getRef(context, route)
    .then(() => {
      return getModal(context, route);
    })
    .then(() => {
      return Promise.all([
        context.executeAction(ApiAction.getApi, { route, view: 'Games', action: Actions.APIOK_GAMES }),
        context.executeAction(ApiAction.getApi, { route, view: 'PredictionsByUser', action: Actions.APIOK_PREDICTIONS_BYUSER_DICO }),
      ]);
    })
    .then(() => {
      done();
    }, (err) => {
      done();
      console.log('InitActions Error : ', err.message);
    });
  },

  ranking(context, route, done) {
    getRef(context, route)
    .then(() => {
      return getModal(context, route);
    })
    .then(() => {
      return context.executeAction(ApiAction.getApi, { route, view: 'Users', action: Actions.APIOK_USERS });
    })
    .then(() => {
      done();
    }, (err) => {
      done();
      console.log('InitActions Error : ', err.message);
    });
  },

  chat(context, route, done) {
    getRef(context, route)
    .then(() => {
      return getModal(context, route);
    })
    .then(() => {
      return context.executeAction(ApiAction.getApi, { route, view: 'Messages', action: Actions.APIOK_MESSAGES });
    })
    .then(() => {
      done();
    }, (err) => {
      done();
      console.log('InitActions Error : ', err.message);
    });
  },

  help(context, route, done) {
    getRef(context, route)
    .then(() => {
      return getModal(context, route);
    })
    .then(() => {
      done();
    }, (err) => {
      done();
      console.log('InitActions Error : ', err.message);
    });
  },

  account(context, route, done) {
    getRef(context, route)
    .then(() => {
      return getModal(context, route);
    })
    .then(() => {
      done();
    }, (err) => {
      done();
      console.log('InitActions Error : ', err.message);
    });
  },

  // Public
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
};

export default InitActions;
