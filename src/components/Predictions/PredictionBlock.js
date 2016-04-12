import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { navigateAction, RouteStore } from "fluxible-router";
import { postApi } from "../../actions/Pages/ApiAction";
import Actions from "../../constants/Actions";

if (process.env.BROWSER) {
  require("../../style/Predictions/PredictionBlock.scss");
}


class PredictionBlock extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  postPrediction(gameId) {
    const route = this.context.getStore("RouteStore").getCurrentRoute();

    let scoreTeamA = 2;
    let scoreTeamB = 1;

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

    this.context.executeAction(postApi, { route, view: 'Predictions', body, action: Actions.APIOK_PREDICTIONS_CREATE});
  }

  render() {
    const { data, gameData } = this.props;

    return (
      <div className="Paper PredictionBlock">
        {data && !data._id && gameData && gameData.status != 'NOT_STARTED' &&
          <div className="Prediction">
            Vous ne pouvez plus parier sur ce match...
          </div>
        }

        {data && !data._id && gameData && gameData.status === 'NOT_STARTED' &&
          <div className="Prediction">
            <div>
              Pariez sur ce match !
            </div>
            <div className="Btns">
              <div className="TxtBtn" onClick={this.postPrediction.bind(this, gameData._id)}>Valider mon pronostique</div>
            </div>
          </div>
        }

        {data && data._id && !data.isOpen &&
          <div className="Prediction">
            <div>
              Vous ne pouvez plus modifier votre pari
            </div>
            <div>data._id : {data._id}</div>
            <div>data.scoreTeamA : {data.scoreTeamA}</div>
            <div>data.scoreTeamB : {data.scoreTeamB}</div>
            <div>data.winner : {data.winner}</div>
            <div>data.game._id : {data.game && data.game._id}</div>
            <div>data.game.teamA : {data.game && data.game.teamA}</div>
            <div>data.game.teamB : {data.game && data.game.teamB}</div>
            <div>data.game.status : {data.game && data.game.status}</div>
          </div>
        }

        {data && data._id && data.isOpen &&
          <div className="Prediction">
            <div>
              Vous pouvez encore modifier votre pari !
            </div>

            <div>data._id : {data._id}</div>
            <div>data.scoreTeamA : {data.scoreTeamA}</div>
            <div>data.scoreTeamB : {data.scoreTeamB}</div>
            <div>data.winner : {data.winner}</div>
            <div>data.game._id : {data.game && data.game._id}</div>
            <div>data.game.teamA : {data.game && data.game.teamA}</div>
            <div>data.game.teamB : {data.game && data.game.teamB}</div>
            <div>data.game.status : {data.game && data.game.status}</div>

            <div className="Btns">
              <div className="TxtBtn" onClick={this.postPrediction.bind(this, data.game._id)}>Modifier mon pronostique</div>
            </div>
          </div>
        }
      </div>
    );
  }
}

PredictionBlock = connectToStores(PredictionBlock, ["PredictionBlockStore"], (context) => {
  return {
    data: context.getStore("PredictionBlockStore").getData(),
    gameData: context.getStore("GameBlockStore").getData()
  };
}, {getStore: PropTypes.func});

export default PredictionBlock;
