import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { NavLink, navigateAction, RouteStore } from "fluxible-router";
import Labels from "../constants/Labels";

import HelpBlock from "../components/Help/HelpBlock";
import GameBlock from "../components/Games/GameBlock";

import GamesFilters from "../components/Games/GamesFilters";
import GamesTab from "../components/Games/GamesTab";
import GroupRanking from "../components/Games/GroupRanking";

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
    const { filter } = this.props;

    let gameBlock;
    //    gameBlock = <GameBlock />;

    return (
      <div className="HomePage">
        {msg === 'new' &&
          <div className="Paper HomeHelp">
            <div>
              <HelpBlock />
            </div>
            <div className="HelpSpacer">
              <NavLink className="TxtBtn" routeName="home">Fermer les règles</NavLink>
            </div>
          </div>
        }
        {gameBlock}

        <GamesFilters />
        <GamesTab />

        {filter === 'group' && false &&
          <GroupRanking />
        }
      </div>
    );
  }
}

HomePage = connectToStores(HomePage, ["GamesTabStore"], (context) => {
  return {
    filter: context.getStore("GamesTabStore").getFilter(),
    subfilter: context.getStore("GamesTabStore").getSubfilter(),
  };
}, {getStore: PropTypes.func});

export default HomePage;
