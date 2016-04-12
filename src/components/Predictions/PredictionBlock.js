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
      scoreTeamA: this.props.data.scoreTeamA || '',
      scoreTeamB: this.props.data.scoreTeamB || ''
    };
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  handleChangeA(e) {
    this.setState({scoreTeamA: e.target.value});
  }

  handleChangeB(e) {
    this.setState({scoreTeamB: e.target.value});
  }

  postPrediction(gameId) {
    this.context.executeAction(initCreate, {});
    const route = this.context.getStore("RouteStore").getCurrentRoute();
    let scoreTeamA = this.refs.scoreTeamA.value;
    let scoreTeamB = this.refs.scoreTeamB.value;

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

  updatePrediction(predictionId) {
    this.context.executeAction(initUpdate, {});
    const route = this.context.getStore("RouteStore").getCurrentRoute();
    let scoreTeamA = this.refs.scoreTeamA.value;
    let scoreTeamB = this.refs.scoreTeamB.value;

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

    this.context.executeAction(putApi, { route, view: 'Prediction', body, action: Actions.APIOK_PREDICTION_UPDATE, predictionId});
  }

  render() {
    const { data, pending, gameData } = this.props;
    const { scoreTeamA, scoreTeamB } = this.state;

    return (
      <div className="Paper PredictionBlock">
        {pending &&
          <div className="LoaderContainer"><div className="Loader" /></div>
        }
      
        {!pending && data && !data._id && gameData && gameData.status != 'NOT_STARTED' &&
          <div className="Prediction">
            Vous ne pouvez plus parier sur ce match...
          </div>
        }

        {!pending && data && !data._id && gameData && gameData.status === 'NOT_STARTED' &&
          <div className="Prediction">
            <div className="Title">
              Pariez sur ce match
            </div>
            <div className="Inputs">
              <input type="number" value={scoreTeamA} onChange={this.handleChangeA.bind(this)} pattern="\d*" min="0" max="9" ref="scoreTeamA"/>
              <span> - </span>
              <input type="number" value={scoreTeamB} onChange={this.handleChangeB.bind(this)} pattern="\d*" min="0" max="9" ref="scoreTeamB"/>
            </div>
            <div className="Btns">
              <div className="TxtBtn" onClick={this.postPrediction.bind(this, gameData._id)}>Valider mon pronostique</div>
            </div>
          </div>
        }

        {!pending && data && data._id && !data.isOpen &&
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

        {!pending && data && data._id && data.isOpen &&
          <div className="Prediction">
            <div className="Title">
              Vous pouvez encore modifier votre pari
            </div>
            <div className="Inputs">
              <input type="number" value={scoreTeamA} onChange={this.handleChangeA.bind(this)} pattern="\d*" min="0" max="9" ref="scoreTeamA"/>
              <span> - </span>
              <input type="number" value={scoreTeamB} onChange={this.handleChangeB.bind(this)} pattern="\d*" min="0" max="9" ref="scoreTeamB"/>
            </div>
            <div className="Btns">
              <div className="TxtBtn" onClick={this.updatePrediction.bind(this, data._id)}>Modifier mon pronostique</div>
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
