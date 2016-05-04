import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { navigateAction, RouteStore } from "fluxible-router";
import { postApi, putApi } from "../../actions/Pages/ApiAction";
import { initCreate, initUpdate } from "../../actions/Predictions/PredictionBlockAction";
import Actions from "../../constants/Actions";

if (process.env.BROWSER) {
  require("../../style/Predictions/PredictionBlock.scss");
}


class PredictionBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scoreTeamA: this.props.data.scoreTeamA,
      scoreTeamB: this.props.data.scoreTeamB
    };
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  handleChangeA(e) {
    this.setState({scoreTeamA: e.target.value});
    if (this.state.scoreTeamB)
      this.postPrediction(e.target.value);
  }

  handleChangeB(e) {
    this.setState({scoreTeamB: e.target.value});
    if (this.state.scoreTeamA)
      this.postPrediction(undefined, e.target.value);
  }

  postPrediction(scoreA, scoreB) {
    if (this.props.data._id){
      // Update prediction
      this.context.executeAction(initUpdate, {});
      const route = this.context.getStore("RouteStore").getCurrentRoute();
      let scoreTeamA = this.state.scoreTeamA;
      let scoreTeamB = this.state.scoreTeamB;

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

      this.context.executeAction(putApi, { predictionId: this.props.data._id, route, view: 'Prediction', body, action: Actions.APIOK_PREDICTION_UPDATE });
    } else {
      // Create prediction
      this.context.executeAction(initCreate, {});
      const route = this.context.getStore("RouteStore").getCurrentRoute();
      let scoreTeamA = scoreA || this.state.scoreTeamA;
      let scoreTeamB = scoreB || this.state.scoreTeamB;

      let winner = 'nobody';
      if (scoreTeamA > scoreTeamB)
        winner = 'teamA';
      else if (scoreTeamA < scoreTeamB)
        winner = 'teamB';

      const body = {
        game: { _id: this.props.gameData._id },
        scoreTeamA: scoreTeamA,
        scoreTeamB: scoreTeamB,
        winner: winner
      }

      this.context.executeAction(postApi, { route, view: 'Predictions', body, action: Actions.APIOK_PREDICTIONS_CREATE});
    }
  }

  render() {
    const { data, pending, gameData } = this.props;
    const { scoreTeamA, scoreTeamB } = this.state;

    return (
      <div className="Paper PredictionBlock">
        {data && !data._id && gameData && gameData.status != 'TIMED' &&
          <div className="Title">
            Il est trop tard, vous ne pouvez plus parier sur ce match
          </div>
        }

        {data && data._id && gameData && gameData.status != 'TIMED' &&
          <div>
            <div className="AltPaperTitle">
              <div className="Label">
                Mon pronostique
              </div>
              <div className="icn-60 footix"></div>
            </div>
            <div className="Prediction">
              <div className="Inputs">
                <span>{scoreTeamA}</span>
                <span> - </span>
                <span>{scoreTeamB}</span>
              </div>
            </div>
            <div className="Points">
              {gameData.status === 'IN_PROGRESS' && <span>Pour l'instant, ce pronostique vous rapporte </span>}
              {gameData.status === 'FINISHED' &&<span>Ce pronostique vous rapporte </span>}
              <span>{data.score < 2 ? data.score + ' point.' : data.score + ' points.'}</span>
            </div>
          </div>
        }

        {data && gameData && gameData.status === 'TIMED' &&
          <div>
            <div className="AltPaperTitle">
              <div className="Label">
                Mon pronostique
              </div>
              <div className="icn-60 footix"></div>
            </div>
            <div>
              <div className="Prediction">
                <div className="Inputs">
                  <input type="number" value={scoreTeamA} onChange={this.handleChangeA.bind(this)} pattern="\d*" min="0" max="9" />
                  <span> - </span>
                  <input type="number" value={scoreTeamB} onChange={this.handleChangeB.bind(this)} pattern="\d*" min="0" max="9" />
                </div>
                <div className="Btns">
                  {!pending && <div className="TxtBtn" onClick={this.postPrediction.bind(this)}>Valider</div>}
                  {pending && <div className="TxtBtn" onClick={this.postPrediction.bind(this)}>...</div>}
                </div>
              </div>
            <div className="PoolRanking">
              Faire apparaitre ici le classement provisoir des poules ?
            </div>
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
    pending: context.getStore("PredictionBlockStore").getPending(),
    gameData: context.getStore("GameBlockStore").getData(),
  };
}, {getStore: PropTypes.func});

export default PredictionBlock;
