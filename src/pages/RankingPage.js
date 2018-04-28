import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connectToStores } from "fluxible-addons-react";
import Actions from "../constants/Actions";
import ApiAction from "../actions/Pages/ApiAction";

import UsersTab from "../components/Ranking/UsersTab";

class RankingPage extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  componentDidMount(){
    const route = this.context.getStore("RouteStore").getCurrentRoute();
    this.context.executeAction(ApiAction.getApi, { route, view: 'GamesNext', action: Actions.APIOK_GAMES_NEXTMINI});
    this.context.executeAction(ApiAction.getApi, { route, view: 'Users', action: Actions.APIOK_USERS });
  }

  render() {
    const { data } = this.props;

    return (
      <div className="ScrollPage">
        {!data && <div className="FootixLoader" />}
        {data &&
          <div className="RankingPageContainer">
            <UsersTab />
          </div>
        }
      </div>
    );
  }
}

RankingPage = connectToStores(RankingPage, ["UsersTabStore"], (context) => {
  return {
    data: context.getStore("UsersTabStore").getData()
  };
}, {getStore: PropTypes.func});

export default RankingPage;
