import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { navigateAction, RouteStore } from "fluxible-router";
import MatchsData from "../constants/MatchsData";

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
          <div className="Paper" style={{textAlign: 'center'}}>
            <div className="PaperTitle">
              LISTE DES MATCHS
            </div>
            <div className="GamesPageContent">
              {true && MatchsData && MatchsData.map((item, i) =>
                <div key={i} className="Match">
                  {item.teamA + ' - ' + item.teamB}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GamesPage = connectToStores(GamesPage, ["LoginPageStore"], (context) => {
  return {
    credentials: context.getStore("LoginPageStore").getCredentials()
  };
}, {getStore: PropTypes.func});

export default GamesPage;