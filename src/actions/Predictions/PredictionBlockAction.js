import { getApi, postApi, putApi } from "../../actions/Pages/ApiAction";
import { navigateAction } from "fluxible-router";
import Actions from "../../constants/Actions";
import GameModalHelper from "../../components/Helpers/GameModalHelper";

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
      GameModalHelper.altCloseGameModal(context);
      return context.executeAction(getApi, { route, view: 'PredictionsByUser', action: Actions.APIOK_PREDICTIONS_BYUSER_DICO });
    })
    .then(() => {
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
      GameModalHelper.altCloseGameModal(context);
      return context.executeAction(getApi, { route, view: 'PredictionsByUser', action: Actions.APIOK_PREDICTIONS_BYUSER_DICO });
    })
    .then(() => {
      done();
    });
  },
};

export default PredictionBlockAction;
