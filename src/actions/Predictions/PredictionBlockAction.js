import { postApi, putApi } from "../../actions/Pages/ApiAction";
import { navigateAction } from "fluxible-router";
import Actions from "../../constants/Actions";

const PredictionBlockAction = {
  create(context, { route, scoreTeamA, scoreTeamB, gameId }, done) {
    context.dispatch(Actions.PENDING_PREDICTIONS_CREATE);

    if (isNaN(parseInt(scoreTeamA)) || isNaN(parseInt(scoreTeamB))){
      return context.dispatch(Actions.APIOK_PREDICTIONS_CREATE, {});
    }

    let winner = 'nobody';
    if (scoreTeamA > scoreTeamB)
      winner = 'teamA';
    else if (scoreTeamA < scoreTeamB)
      winner = 'teamB';

    const body = {
      game: { _id: gameId },
      scoreTeamA: scoreTeamA,
      scoreTeamB: scoreTeamB,
      winner: winner
    }
    return context.executeAction(postApi, { route, view: 'Predictions', body, action: Actions.APIOK_PREDICTIONS_CREATE})
    .then(() => {
      const newroute = context.getStore("RouteStore").makePath('home');
      context.executeAction(navigateAction, { url: newroute });
      done();
    });
  },

  update(context, { route, scoreTeamA, scoreTeamB, predictionId }, done) {
    context.dispatch(Actions.PENDING_PREDICTION_UPDATE);

    if (isNaN(parseInt(scoreTeamA)) || isNaN(parseInt(scoreTeamB))){return;}

    let winner = 'nobody';
    if (scoreTeamA > scoreTeamB)
      winner = 'teamA';
    else if (scoreTeamA < scoreTeamB)
      winner = 'teamB';

    const body = {
      scoreTeamA: scoreTeamA,
      scoreTeamB: scoreTeamB,
      winner: winner
    }

    return context.executeAction(putApi, { predictionId, route, view: 'Prediction', body, action: Actions.APIOK_PREDICTION_UPDATE })
    .then(() => {
      const newroute = context.getStore("RouteStore").makePath('home');
      context.executeAction(navigateAction, { url: newroute });
      done();
    });
  },
};

export default PredictionBlockAction;
