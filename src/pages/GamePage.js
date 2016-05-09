import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { navigateAction, RouteStore } from "fluxible-router";

import GameBlock from "../components/Games/GameBlock";
import PredictionBlock from "../components/Predictions/PredictionBlock";
import PredictionsByGameTab from "../components/Predictions/PredictionsByGameTab";

if (process.env.BROWSER) {
  require("../style/Pages/GamePage.scss");
}


class GamePage extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  render() {
    const { data } = this.props;

    return (
      <div className="GamePage">
        <div className="GamePageContainer">
          <GameBlock />
          <PredictionBlock />

          {(data.status === 'IN_PROGRESS' || data.status === 'FINISHED') &&
            <PredictionsByGameTab />
          }
        </div>
      </div>
    );
  }
}

GamePage = connectToStores(GamePage, ["GameBlockStore"], (context) => {
  return {
    data: context.getStore("GameBlockStore").getData(),
  };
}, {getStore: PropTypes.func});

export default GamePage;