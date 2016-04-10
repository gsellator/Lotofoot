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
          <div key={i}>
            <div className="Prediction">
              <span>{item.updatedAt}</span>
              <span>{item.createdAt}</span>
              <span>{item.game}</span>
              <span>{item.user}</span>
              <span>{item.scoreTeamA}</span>
              <span>{item.scoreTeamB}</span>
              <span>{item.winner}</span>
            </div>
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