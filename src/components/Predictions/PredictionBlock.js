import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { RouteStore } from "fluxible-router";
import { create, update } from "../../actions/Predictions/PredictionBlockAction";
import Labels from "../../Labels";

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
  }

  handleChangeB(e) {
    this.setState({scoreTeamB: e.target.value});
  }

  postPrediction(scoreA, scoreB) {
    if (!this.props.data._id){
      // Create prediction
      const route = this.context.getStore("RouteStore").getCurrentRoute();
      let scoreTeamA = scoreA || this.state.scoreTeamA;
      let scoreTeamB = scoreB || this.state.scoreTeamB;
      this.context.executeAction(create, { route, scoreTeamA, scoreTeamB, gameId: this.props.gameData._id });
    } else {
      // Update prediction
      const route = this.context.getStore("RouteStore").getCurrentRoute();
      let scoreTeamA = this.state.scoreTeamA;
      let scoreTeamB = this.state.scoreTeamB;
      this.context.executeAction(update, { route, scoreTeamA, scoreTeamB, predictionId: this.props.data._id });
    }
  }

  render() {
    const { data, pending, gameData } = this.props;
    const { scoreTeamA, scoreTeamB } = this.state;

    return (
      <div className="Paper PredictionBlock">
        {data && !data._id && gameData && gameData.status != 'TIMED' &&
          <div className="Title">
            {Labels.tooLate}
          </div>
        }

        {data && data._id && gameData && gameData.status != 'TIMED' &&
          <div>
            <div className="AltPaperTitle">
              <div className="Label">
                {Labels.myPrediction}
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
              {gameData.status === 'IN_PROGRESS' && <span>{Labels.inProgressGain + ' '}</span>}
              {gameData.status === 'FINISHED' &&<span>{Labels.finishedGain + ' '}</span>}
              <span>{data.score < 2 ? data.score + ' ' + Labels.point + '.' : data.score + ' ' + Labels.point + '.'}</span>
            </div>
          </div>
        }

        {data && gameData && gameData.status === 'TIMED' &&
          <div>
            <div className="AltPaperTitle">
              <div className="Label">
                {Labels.myPrediction}
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
                  {!pending && <div className="TxtBtn" onClick={this.postPrediction.bind(this, undefined, undefined)}>{Labels.validate}</div>}
                  {pending && <div className="TxtBtn" onClick={this.postPrediction.bind(this, undefined, undefined)}>...</div>}
                </div>
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
