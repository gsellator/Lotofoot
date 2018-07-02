import React, { Component } from "react";
import PropTypes from 'prop-types';

import PredictionBlockAction from "../../actions/Pages/PredictionBlockAction";
import labels from "../../labels";

if (process.env.BROWSER) {
  require("../../style/Predictions/PredictionBlock.scss");
}


class PredictionBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scoreTeamA: this.props.predictionData.scoreTeamA === undefined ? '' : this.props.predictionData.scoreTeamA,
      scoreTeamB: this.props.predictionData.scoreTeamB === undefined ? '' : this.props.predictionData.scoreTeamB,
      winner: this.props.predictionData.winner,
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

  handleChangeWinner(winner) {
    this.setState({winner: winner});
  }

  getRandomScore(min, max) {
    this.setState({
      scoreTeamA: Math.floor(Math.random() * (max - min + 1)) + min,
      scoreTeamB: Math.floor(Math.random() * (max - min + 1)) + min,
    });
  }

  postPrediction(e) {
    e.preventDefault();
    if (!this.props.predictionData._id){
      // Create prediction
      const route = this.context.getStore("RouteStore").getCurrentRoute();
      this.context.executeAction(PredictionBlockAction.create, { route, scoreTeamA: this.state.scoreTeamA, scoreTeamB: this.state.scoreTeamB, winner: this.state.winner, gamePhase: this.props.gameData.phase, gameId: this.props.gameData._id });
    } else {
      // Update prediction
      const route = this.context.getStore("RouteStore").getCurrentRoute();
      this.context.executeAction(PredictionBlockAction.update, { route, scoreTeamA: this.state.scoreTeamA, scoreTeamB: this.state.scoreTeamB, winner: this.state.winner, gamePhase: this.props.gameData.phase, predictionId: this.props.predictionData._id });
    }
  }

  render() {
    const { predictionData, pending, gameData } = this.props;
    const { scoreTeamA, scoreTeamB } = this.state;

    return (
      <div className="Paper PredictionBlock">
        {!(predictionData && gameData) && <div className="FootixLoader" />}
        {predictionData && !predictionData._id && gameData && gameData.status != 'TIMED' &&
          <div className="Title">
            {labels.tooLate}
          </div>
        }

        {predictionData && predictionData._id && gameData && gameData.status != 'TIMED' &&
          <div>
            <div className="PaperTitle">
              <div className="Label">
                {labels.myPrediction}
              </div>
            </div>
            <div className="Prediction">
              <div className="Inputs">
                <span className={gameData.phase != 0 && predictionData.scoreTeamA === predictionData.scoreTeamB && predictionData.winner === 'teamA' ? 'Winner' : ''}>
                  {scoreTeamA}
                </span>
                <span> - </span>
                <span className={gameData.phase != 0 && predictionData.scoreTeamA === predictionData.scoreTeamB && predictionData.winner === 'teamB' ? 'Winner' : ''}>
                  {scoreTeamB}
                </span>
              </div>
            </div>
            <div className="Points">
              {gameData.status === 'IN_PROGRESS' && <span>{labels.inProgressGain + ' '}</span>}
              {gameData.status === 'FINISHED' &&<span>{labels.finishedGain + ' '}</span>}
              <span>{predictionData.score < 2 ? predictionData.score + ' ' + labels.point + '.' : predictionData.score + ' ' + labels.point + '.'}</span>
            </div>
          </div>
        }

        {predictionData && gameData && gameData.status === 'TIMED' &&
          <div>
            <div className="PaperTitle">
              {labels.myPrediction}
            </div>
            <div>
              {pending && <div className="FootixLoader" />}
              {!pending &&
                <form className="Prediction" onSubmit={this.postPrediction.bind(this)}>
                  <div className="Inputs">
                    <input type="number" value={scoreTeamA} onChange={this.handleChangeA.bind(this)} pattern="\d*" min="0" max="100" />
                    <span> - </span>
                    <input type="number" value={scoreTeamB} onChange={this.handleChangeB.bind(this)} pattern="\d*" min="0" max="100" />
                    <button type="button" className="ImageBtn" onClick={this.getRandomScore.bind(this, 0, 4)}>
                      <div className="btn-26 wand" />
                    </button>
                  </div>
                  {gameData.phase != 0 && this.state.scoreTeamA !== '' && this.state.scoreTeamA == this.state.scoreTeamB &&
                    <div className="InputsBtns">
                      <span>
                        {labels.winner + ' > '}
                      </span>
                      <span>
                        <div className={this.state.winner === 'teamA' ? 'TabBtn Active' : 'TabBtn'} onClick={this.handleChangeWinner.bind(this, 'teamA')}>
                          {!gameData.teamA && labels[gameData.futureTeamA]}
                          {gameData.teamA && labels[gameData.teamA.slug]}
                        </div>
                        <div className={this.state.winner === 'teamB' ? 'TabBtn Active' : 'TabBtn'} onClick={this.handleChangeWinner.bind(this, 'teamB')}>
                          {!gameData.teamB && labels[gameData.futureTeamB]}
                          {gameData.teamB && labels[gameData.teamB.slug]}
                        </div>
                      </span>
                    </div>
                  }
                  <div className="Btns">
                    <button type="submit" className="PaperBtn">{labels.validate}</button>
                  </div>
                </form>
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

export default PredictionBlock;
