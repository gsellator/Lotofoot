import ApiAction from "../../actions/Pages/ApiAction";
import Actions from "../../constants/Actions";
import GameModalHelper from "../../components/Helpers/GameModalHelper";
import labels from "../../labels";

export default {
  create(context, { route, scoreTeamA, scoreTeamB, winner, gamePhase, gameId }, done) {
    if (isNaN(parseInt(scoreTeamA)) || isNaN(parseInt(scoreTeamB)))
      return;

    let tmpWinner = 'nobody';
    if (scoreTeamA > scoreTeamB)
      tmpWinner = 'teamA';
    else if (scoreTeamA < scoreTeamB)
      tmpWinner = 'teamB';

    if (gamePhase != 0 && tmpWinner === 'nobody' && winner)
      tmpWinner = winner;

    if (gamePhase != 0 && tmpWinner === 'nobody'){
      return context.dispatch(Actions.DIALOG_SHOW, { error: 'error', errorTxt: labels.pickAWinner });
    }

    context.dispatch(Actions.PENDING_PREDICTION);
    const body = {
      game: { _id: gameId },
      scoreTeamA: scoreTeamA,
      scoreTeamB: scoreTeamB,
      winner: tmpWinner
    }
    return context.executeAction(ApiAction.postApi, { route, view: 'Predictions', body, action: Actions.APIOK_PREDICTIONS_CREATE})
    .then(() => {
      GameModalHelper.altCloseGameModal(context);
      return context.executeAction(ApiAction.getApi, { route, view: 'PredictionsByUser', action: Actions.APIOK_PREDICTIONS_BYUSER_DICO });
    })
    .then(() => {
      done();
    });
  },

  update(context, { route, scoreTeamA, scoreTeamB, winner, gamePhase, predictionId }, done) {
    if (isNaN(parseInt(scoreTeamA)) || isNaN(parseInt(scoreTeamB)))
      return;

    let tmpWinner = 'nobody';
    if (scoreTeamA > scoreTeamB)
      tmpWinner = 'teamA';
    else if (scoreTeamA < scoreTeamB)
      tmpWinner = 'teamB';

    if (gamePhase != 0 && tmpWinner === 'nobody' && winner)
      tmpWinner = winner;

    if (gamePhase != 0 && tmpWinner === 'nobody'){
      return context.dispatch(Actions.DIALOG_SHOW, { error: 'error', errorTxt: labels.pickAWinner });
    }

    context.dispatch(Actions.PENDING_PREDICTION);
    const body = {
      scoreTeamA: scoreTeamA,
      scoreTeamB: scoreTeamB,
      winner: tmpWinner
    }

    return context.executeAction(ApiAction.putApi, { predictionId, route, view: 'Prediction', body, action: Actions.APIOK_PREDICTION_UPDATE })
    .then(() => {
      GameModalHelper.altCloseGameModal(context);
      return context.executeAction(ApiAction.getApi, { route, view: 'PredictionsByUser', action: Actions.APIOK_PREDICTIONS_BYUSER_DICO });
    })
    .then(() => {
      done();
    });
  },
};