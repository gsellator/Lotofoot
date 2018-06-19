import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connectToStores } from "fluxible-addons-react";
import { NavLink } from "fluxible-router";

import HelpBlock from "../components/Help/HelpBlock";
import GamesFilters from "../components/Games/GamesFilters";
import GamesTab from "../components/Games/GamesTab";
import GroupRanking from "../components/Games/GroupRanking";

import labels from "../labels";

if (process.env.BROWSER) {
  require("../style/Pages/GamesPage.scss");
}

class GamesPage extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  render() {
    const { filter, subfilter, days, predictions, groupRanking} = this.props;
    const route = this.context.getStore('RouteStore').getCurrentRoute();
    const msg = route.query.msg;

    return (
      <div className="ScrollPage GamesPage">
        {!(days && predictions) && <div className="FootixLoader" />}

        {(days && predictions) &&
          <div>
            {msg === 'new' &&
              <div className="Paper GamesHelp">
                <div className="PaperTitle">
                  {labels.rules}
                </div>

                <HelpBlock />

                <div className="BtnContainer">
                  <NavLink className="PaperBtn" routeName="games">
                    {labels.gotIt}
                  </NavLink>
                </div>
              </div>
            }

            <GamesFilters
              filter={filter}
              subfilter={subfilter}/>

            <GamesTab
              days={days}
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
    days: context.getStore("GamesTabStore").getDays(),
    predictions: context.getStore("GamesTabStore").getPredictions(),
    groupRanking: context.getStore("GamesTabStore").getGroupRanking(),
  };
}, {getStore: PropTypes.func});

export default GamesPage;
