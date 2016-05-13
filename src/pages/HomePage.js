import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { NavLink, navigateAction, RouteStore } from "fluxible-router";
import Labels from "../constants/Labels";

import HelpBlock from "../components/Help/HelpBlock";
import GameBlock from "../components/Games/GameBlock";
import GamesTab from "../components/Games/GamesTab";

import Actions from "../constants/Actions";

if (process.env.BROWSER) {
  require("../style/Pages/HomePage.scss");
}


class HomePage extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  render() {
    const route = this.context.getStore('RouteStore').getCurrentRoute();
    const msg = route.getIn(["query", "msg"]);

    return (
      <div className="HomePage">
        <div className="HomePageContainer">
          {msg === 'new' &&
            <div className="Paper">
              <div className="PaperTitle">
                Règles du jeu
              </div>
              <div>
                <HelpBlock />
              </div>
              <div className="HelpSpacer">
                <NavLink className="TxtBtn" routeName="home">Fermer les règles</NavLink>
              </div>
            </div>
          }

          <GameBlock />
          <GamesTab />
        </div>
      </div>
    );
  }
}

//HomePage = connectToStores(HomePage, ["LoginPageStore"], (context) => {
//  return {
//    credentials: context.getStore("LoginPageStore").getCredentials()
//  };
//}, {getStore: PropTypes.func});

export default HomePage;