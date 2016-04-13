import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { navigateAction, RouteStore } from "fluxible-router";

import GameBlock from "../components/Games/GameBlock";
import PredictionBlock from "../components/Predictions/PredictionBlock";

if (process.env.BROWSER) {
  require("../style/Pages/GamePage.scss");
}


class GamePage extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="GamePage">
        <div className="GamePageContainer">
          <GameBlock />
          <PredictionBlock />
        </div>
      </div>
    );
  }
}

//GamePage = connectToStores(GamePage, ["LoginPageStore"], (context) => {
//  return {
//    credentials: context.getStore("LoginPageStore").getCredentials()
//  };
//}, {getStore: PropTypes.func});

export default GamePage;