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
      scoreTeamA: this.props.predictionData.scoreTeamA,
      scoreTeamB: this.props.predictionData.scoreTeamB,
      winner: this.props.predictionData.winner,
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
    if (this.state.scoreTeamA === '' && this.state.scoreTeamA !== this.props.predictionData.scoreTeamA) {this.setState({scoreTeamA: this.props.predictionData.scoreTeamA});}
    if (this.state.scoreTeamB === '' && this.state.scoreTeamB !== this.props.predictionData.scoreTeamB) {this.setState({scoreTeamB: this.props.predictionData.scoreTeamB});}
    if (this.state.winner === undefined && this.state.winner != this.props.predictionData.winner) {this.setState({winner: this.props.predictionData.winner});}
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
                <span>{scoreTeamA}</span>
                <span> - </span>
                <span>{scoreTeamB}</span>
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
                <div className="Prediction">
                  <div className="Inputs">
                    <input type="number" value={scoreTeamA} onChange={this.handleChangeA.bind(this)} pattern="\d*" min="0" max="100" />
                    <span> - </span>
                    <input type="number" value={scoreTeamB} onChange={this.handleChangeB.bind(this)} pattern="\d*" min="0" max="100" />
                  </div>
                  {gameData.phase != 0 && this.state.scoreTeamA != undefined && this.state.scoreTeamA == this.state.scoreTeamB &&
                    <div className="InputsBtns">
                      <span>
                        {labels.winner + ' > '}
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

export default PredictionBlock;
