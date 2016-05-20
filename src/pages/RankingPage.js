import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { navigateAction, RouteStore } from "fluxible-router";
import Actions from "../constants/Actions";
import { getApi } from "../actions/Pages/ApiAction";

import UsersTab from "../components/Ranking/UsersTab";

if (process.env.BROWSER) {
  require("../style/Pages/RankingPage.scss");
}


class RankingPage extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  componentDidMount(){
    const route = this.context.getStore("RouteStore").getCurrentRoute();
    this.context.executeAction(getApi, { route, view: 'GamesNext', action: Actions.APIOK_GAMES_NEXTMINI});
    this.context.executeAction(getApi, { route, view: 'Users', action: Actions.APIOK_USERS });
  }

  render() {
    const { data } = this.props;

    return (
      <div className="RankingPage">
        {!data && <div className="LoaderContainer"><div className="Loader" /></div>}
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
