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
      <div className="PredictionsTab">
        {data && data.map((item, i) =>
          <div key={i} className="Prediction">
            <div>item._id : {item._id}</div>
            <div>item.scoreTeamA : {item.scoreTeamA}</div>
            <div>item.scoreTeamB : {item.scoreTeamB}</div>
            <div>item.winner : {item.winner}</div>
            <div>item.isOpen : {item.isOpen}</div>
            <div>item.createdAt : {item.createdAt}</div>
            <div>item.game._id : {item.game._id}</div>
            <div>item.game.friendlyId : {item.game.friendlyId}</div>
            <div>item.game.phase : {item.game.phase}</div>
            <div>item.game.datetime : {item.game.datetime}</div>
            <div>item.game.stadium : {item.game.stadium}</div>
            <div>item.game.teamA : {item.game.teamA}</div>
            <div>item.game.teamB : {item.game.teamB}</div>
            <div>item.game.scoreTeamA : {item.game.scoreTeamA}</div>
            <div>item.game.scoreTeamB : {item.game.scoreTeamB}</div>
            <div>item.game.winner : {item.game.winner}</div>
            <div>item.game.status : {item.game.status}</div>
            <div>item.game.channel : {item.game.channel}</div>
            <div>item.game.group : {item.game.group}</div>
            <div>item.game.createdAt : {item.game.createdAt}</div>
            <div>item.game.updatedAt : {item.game.updatedAt}</div>
          </div>
        )}
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