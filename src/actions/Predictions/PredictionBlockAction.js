import ApiAction from "../../actions/Pages/ApiAction";
import { navigateAction } from "fluxible-router";
import Actions from "../../constants/Actions";
import GameModalHelper from "../../components/Helpers/GameModalHelper";

const PredictionBlockAction = {
  create(context, { route, scoreTeamA, scoreTeamB, winner, gamePhase, gameId }, done) {
    context.dispatch(Actions.PENDING_PREDICTIONS_CREATE);

    if (isNaN(parseInt(scoreTeamA)) || isNaN(parseInt(scoreTeamB)))
      return context.dispatch(Actions.APIOK_PREDICTIONS_CREATE, {});

    let tmpWinner = 'nobody';
    if (scoreTeamA > scoreTeamB)
      tmpWinner = 'teamA';
    else if (scoreTeamA < scoreTeamB)
      tmpWinner = 'teamB';

    if (gamePhase != 0 && tmpWinner === 'nobody' && winner)
      tmpWinner = winner;

    if (gamePhase != 0 && tmpWinner === 'nobody'){
      context.dispatch(Actions.DIALOG_SHOW, { error: 'Veuillez indiquer quelle équipe gagnera à l\'issue des tirs aux buts.', errorTxt: 'Veuillez indiquer quelle équipe gagnera à l\'issue des tirs aux buts.' });
      return context.dispatch(Actions.APIOK_PREDICTIONS_CREATE, {});
    }

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
    context.dispatch(Actions.PENDING_PREDICTION_UPDATE);

    if (isNaN(parseInt(scoreTeamA)) || isNaN(parseInt(scoreTeamB)))
      return context.dispatch(Actions.APIOK_PREDICTION_UPDATE, {});

    let tmpWinner = 'nobody';
    if (scoreTeamA > scoreTeamB)
      tmpWinner = 'teamA';
    else if (scoreTeamA < scoreTeamB)
      tmpWinner = 'teamB';

    if (gamePhase != 0 && tmpWinner === 'nobody' && winner)
      tmpWinner = winner;

    if (gamePhase != 0 && tmpWinner === 'nobody'){
      context.dispatch(Actions.DIALOG_SHOW, { error: 'Veuillez indiquer quelle équipe gagnera à l\'issue des tirs aux buts.', errorTxt: 'Veuillez indiquer quelle équipe gagnera à l\'issue des tirs aux buts.' });
      return context.dispatch(Actions.APIOK_PREDICTION_UPDATE, {});
    }

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

export default PredictionBlockAction;
