import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { navigateAction, RouteStore } from "fluxible-router";

import GamesTab from "../components/Games/GamesTab";

if (process.env.BROWSER) {
  require("../style/Pages/GamesPage.scss");
}


class GamesPage extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="GamesPage">
        <div className="GamesPageContainer">
          <GamesTab />
        </div>
      </div>
    );
  }
}

//GamesPage = connectToStores(GamesPage, ["LoginPageStore"], (context) => {
//  return {
//    credentials: context.getStore("LoginPageStore").getCredentials()
//  };
//}, {getStore: PropTypes.func});

export default GamesPage;