import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connectToStores } from "fluxible-addons-react";

import PredictionBlockAction from "../../actions/Pages/PredictionBlockAction";
import labels from "../../labels";

if (process.env.BROWSER) {
  require("../../style/Predictions/PredictionBlock.scss");
}


class PredictionBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scoreTeamA: this.props.data.scoreTeamA,
      scoreTeamB: this.props.data.scoreTeamB,
      winner: this.props.data.winner,
    };
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    if (this.state.scoreTeamA === undefined && this.state.scoreTeamA != this.props.data.scoreTeamA) {this.setState({scoreTeamA: this.props.data.scoreTeamA});}
    if (this.state.scoreTeamB === undefined && this.state.scoreTeamB != this.props.data.scoreTeamB) {this.setState({scoreTeamB: this.props.data.scoreTeamB});}
    if (this.state.winner === undefined && this.state.winner != this.props.data.winner) {this.setState({winner: this.props.data.winner});}
  }

  handleChangeA(e) {
    this.setState({scoreTeamA: e.target.value});
  }

  handleChangeB(e) {
    this.setState({scoreTeamB: e.target.value});
  }

  handleChangeWinner(winner) {
    this.setState({winner: winner});
  }

  postPrediction() {
    if (!this.props.data._id){
      // Create prediction
      const route = this.context.getStore("RouteStore").getCurrentRoute();
      this.context.executeAction(PredictionBlockAction.create, { route, scoreTeamA: this.state.scoreTeamA, scoreTeamB: this.state.scoreTeamB, winner: this.state.winner, gamePhase: this.props.gameData.phase, gameId: this.props.gameData._id });
    } else {
      // Update prediction
      const route = this.context.getStore("RouteStore").getCurrentRoute();
      this.context.executeAction(PredictionBlockAction.update, { route, scoreTeamA: this.state.scoreTeamA, scoreTeamB: this.state.scoreTeamB, winner: this.state.winner, gamePhase: this.props.gameData.phase, predictionId: this.props.data._id });
    }
  }

  render() {
    const { data, pending, gameData } = this.props;
    const { scoreTeamA, scoreTeamB } = this.state;

    return (
      <div className="Paper PredictionBlock">
        {!(data && gameData) && <div className="FootixLoader" />}
        {data && !data._id && gameData && gameData.status != 'TIMED' &&
          <div className="Title">
            {labels.tooLate}
          </div>
        }

        {data && data._id && gameData && gameData.status != 'TIMED' &&
          <div>
            <div className="PaperTitle">
              <div className="Label">
                {labels.myPrediction}
              </div>
            </div>
            <div className="Prediction">
              <div className="Inputs">
                <span>{scoreTeamA}</span>
                <span> - </span>
                <span>{scoreTeamB}</span>
              </div>
            </div>
            <div className="Points">
              {gameData.status === 'IN_PROGRESS' && <span>{labels.inProgressGain + ' '}</span>}
              {gameData.status === 'FINISHED' &&<span>{labels.finishedGain + ' '}</span>}
              <span>{data.score < 2 ? data.score + ' ' + labels.point + '.' : data.score + ' ' + labels.point + '.'}</span>
            </div>
          </div>
        }

        {data && gameData && gameData.status === 'TIMED' &&
          <div>
            <div className="PaperTitle">
              {labels.myPrediction}
            </div>
            <div>
              {pending && <div className="FootixLoader" />}
              {!pending &&
                <div className="Prediction">
                  <div className="Inputs">
                    <input type="number" value={scoreTeamA} onChange={this.handleChangeA.bind(this)} pattern="\d*" min="0" max="100" />
                    <span> - </span>
                    <input type="number" value={scoreTeamB} onChange={this.handleChangeB.bind(this)} pattern="\d*" min="0" max="100" />
                  </div>
                  {gameData.phase != 0 && this.state.scoreTeamA != undefined && this.state.scoreTeamA == this.state.scoreTeamB &&
                    <div className="InputsBtns">
                      <span>
                        Gagnant :
                      </span>
                      <span>
                        <div className={this.state.winner === 'teamA' ? 'TabBtn Active' : 'TabBtn'} onTouchTap={this.handleChangeWinner.bind(this, 'teamA')}>
                          {!gameData.teamA && labels[gameData.futureTeamA]}
                          {gameData.teamA && labels[gameData.teamA.slug.replace('-', '')]}
                        </div>
                        <div className={this.state.winner === 'teamB' ? 'TabBtn Active' : 'TabBtn'} onTouchTap={this.handleChangeWinner.bind(this, 'teamB')}>
                          {!gameData.teamB && labels[gameData.futureTeamB]}
                          {gameData.teamB && labels[gameData.teamB.slug.replace('-', '')]}
                        </div>
                      </span>
                    </div>
                  }
                  <div className="Btns">
                    <div className="PaperBtn" onTouchTap={this.postPrediction.bind(this)}>{labels.validate}</div>
                  </div>
                </div>
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

PredictionBlock = connectToStores(PredictionBlock, ["GameBlockStore", "PredictionBlockStore"], (context) => {
  const route = context.getStore("RouteStore").getCurrentRoute();
  const game = route.query.game;
  return {
    gameData: context.getStore("GameBlockStore").getData(game),
    data: context.getStore("PredictionBlockStore").getData(game),
    pending: context.getStore("PredictionBlockStore").getPending(),
  };
}, {getStore: PropTypes.func});

export default PredictionBlock;
