import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connectToStores } from "fluxible-addons-react";
import { NavLink } from "fluxible-router";

import HelpBlock from "../components/Help/HelpBlock";
import GamesFilters from "../components/Games/GamesFilters";
import GamesTab from "../components/Games/GamesTab";
import GroupRanking from "../components/Games/GroupRanking";

class GamesPage extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  render() {
    const { filter, subfilter, games, predictions, groupRanking} = this.props;
    const route = this.context.getStore('RouteStore').getCurrentRoute();
    const msg = route.query.msg;

    return (
      <div className="ScrollPage">
        {!(games && predictions) && <div className="FootixLoader" />}

        {(games && predictions) &&
          <div>
            {msg === 'new' &&
              <div className="Paper GamesHelp">
                <div>
                  <HelpBlock />
                </div>
                <div className="HelpSpacer">
                  <NavLink className="PaperBtn" routeName="games">
                    Fermer les règles
                  </NavLink>
                </div>
              </div>
            }

            <GamesFilters
              filter={filter}
              subfilter={subfilter}/>

            <GamesTab
              games={games}
              predictions={predictions} />

            {filter === 'group' &&
              <GroupRanking
                data={groupRanking} />
            }
          </div>
        }
      </div>
    );
  }
}

GamesPage = connectToStores(GamesPage, ["LoginStore", "GamesTabStore"], (context) => {
  return {
    userId: context.getStore('LoginStore').getCredentials()._id,
    filter: context.getStore("GamesTabStore").getFilter(),
    subfilter: context.getStore("GamesTabStore").getSubfilter(),
    games: context.getStore("GamesTabStore").getGames(),
    predictions: context.getStore("GamesTabStore").getPredictions(),
    groupRanking: context.getStore("GamesTabStore").getGroupRanking(),
  };
}, {getStore: PropTypes.func});

export default GamesPage;
