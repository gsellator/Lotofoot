import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { navigateAction, RouteStore } from "fluxible-router";
import MatchsData from "../constants/MatchsData";

if (process.env.BROWSER) {
  require("../style/Pages/HomePage.scss");
}


class HubPage extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="HomePage">
        <div className="HomePageContainer">
          <div className="Paper" style={{textAlign: 'center'}}>
            {true && MatchsData && MatchsData.map((item, i) =>
              <div>{item.teamA + ' - ' + item.teamB}</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

HubPage = connectToStores(HubPage, ["LoginPageStore"], (context) => {
  return {
    credentials: context.getStore("LoginPageStore").getCredentials()
  };
}, {getStore: PropTypes.func});

export default HubPage;