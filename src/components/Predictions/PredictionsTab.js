import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { navigateAction, RouteStore } from "fluxible-router";

if (process.env.BROWSER) {
  require("../../style/Predictions/PredictionsTab.scss");
}


class PredictionsTab extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  render() {
    const { data } = this.props;

    return (
      <div className="Paper PredictionsTab">
        <div className="AltPaperTitle">
          <div className="Label">
            Tous mes pronostiques
          </div>
          <div className="icn-60 footix"></div>
        </div>

        <div className="PredictionsPageContent">
          {data && data.map((item, i) =>
            <div key={i} className="Prediction">
              {false && <div>item._id : {item._id}</div>}
              {false && <div>item.scoreTeamA : {item.scoreTeamA}</div>}
              {false && <div>item.scoreTeamB : {item.scoreTeamB}</div>}
              {false && <div>item.winner : {item.winner}</div>}
              {false && <div>item.isOpen : {item.isOpen}</div>}
              {false && <div>item.createdAt : {item.createdAt}</div>}
              {false && <div>item.game._id : {item.game._id}</div>}
              {false && <div>item.game.friendlyId : {item.game.friendlyId}</div>}
              {false && <div>item.game.phase : {item.game.phase}</div>}
              {false && <div>item.game.datetime : {item.game.datetime}</div>}
              {false && <div>item.game.stadium : {item.game.stadium}</div>}
              {false && <div>item.game.teamA : {item.game.teamA}</div>}
              {false && <div>item.game.teamB : {item.game.teamB}</div>}
              {true && <div>item.game.scoreTeamA : {item.game.scoreTeamA}</div>}
              {true && <div>item.game.scoreTeamB : {item.game.scoreTeamB}</div>}
              {false && <div>item.game.winner : {item.game.winner}</div>}
              {false && <div>item.game.status : {item.game.status}</div>}
              {false && <div>item.game.channel : {item.game.channel}</div>}
              {false && <div>item.game.group : {item.game.group}</div>}
              {false && <div>item.game.createdAt : {item.game.createdAt}</div>}
              {false && <div>item.game.updatedAt : {item.game.updatedAt}</div>}
            </div>
          )}
        </div>
      </div>
    );
  }
}

PredictionsTab = connectToStores(PredictionsTab, ["PredictionsTabStore"], (context) => {
  return {
    data: context.getStore("PredictionsTabStore").getData()
  };
}, {getStore: PropTypes.func});

export default PredictionsTab;