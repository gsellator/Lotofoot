import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { NavLink, navigateAction, RouteStore } from "fluxible-router";
import Bouncefix from 'react-bouncefix';
import Labels from "../Labels";
import Actions from "../constants/Actions";
import { getApi } from "../actions/Pages/ApiAction";

import HelpBlock from "../components/Help/HelpBlock";
import GameBlock from "../components/Games/GameBlock";
import GamesFilters from "../components/Games/GamesFilters";
import GamesTab from "../components/Games/GamesTab";
import GroupRanking from "../components/Games/GroupRanking";

if (process.env.BROWSER) {
  require("../style/Pages/GamesPage.scss");
}

class GamesPage extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  componentDidMount(){
    this.componentDidUpdate();

  }

  componentDidUpdate(){
    if (!this.state.loaded && this.props.userId){
      this.setState({loaded: true});
      const route = this.context.getStore("RouteStore").getCurrentRoute();
      this.context.executeAction(getApi, { route, view: 'GamesNext', action: Actions.APIOK_GAMES_NEXT});
      this.context.executeAction(getApi, { route, view: 'Games', action: Actions.APIOK_GAMES });
      this.context.executeAction(getApi, { route, view: 'PredictionsByUser', action: Actions.APIOK_PREDICTIONS_BYUSER_DICO });
    }
  }

  render() {
    const route = this.context.getStore('RouteStore').getCurrentRoute();
    const msg = route.query.msg;
    const { filter, games, predictions } = this.props;
    let gameBlock;
    //    gameBlock = <GameBlock />;

    return (
      <Bouncefix className="GamesPage">
        {!(games && predictions) && <div className="LoaderContainer"><div className="Loader" /></div>}

        {(games && predictions) &&
          <div>
            {msg === 'new' &&
              <div className="Paper GamesHelp">
                <div>
                  <HelpBlock />
                </div>
                <div className="HelpSpacer">
                  <NavLink className="PaperBtn" routeName="games">Fermer les règles</NavLink>
                </div>
              </div>
            }
            {gameBlock}

            <GamesFilters />
            <GamesTab />

            {filter === 'group' &&
              <GroupRanking />
            }
          </div>
        }
      </Bouncefix>
    );
  }
}

GamesPage = connectToStores(GamesPage, ["LoginPageStore", "GamesTabStore"], (context) => {
  return {
    userId: context.getStore('LoginPageStore').getCredentials()._id,
    filter: context.getStore("GamesTabStore").getFilter(),
    games: context.getStore("GamesTabStore").getGames(),
    predictions: context.getStore("GamesTabStore").getPredictions(),
  };
}, {getStore: PropTypes.func});

export default GamesPage;
