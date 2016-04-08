import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { navigateAction, RouteStore } from "fluxible-router";

import UsersTab from "../components/Ranking/UsersTab";

if (process.env.BROWSER) {
  require("../style/Pages/RankingPage.scss");
}


class RankingPage extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="RankingPage">
        <div className="RankingPageContainer">
          <div className="Paper" style={{textAlign: 'center'}}>
            <div className="PaperTitle">
              CLASSEMENT
            </div>
            <div className="RankingPageContent">
              <UsersTab />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RankingPage = connectToStores(RankingPage, ["LoginPageStore"], (context) => {
  return {
    credentials: context.getStore("LoginPageStore").getCredentials()
  };
}, {getStore: PropTypes.func});

export default RankingPage;