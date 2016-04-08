import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { navigateAction, RouteStore } from "fluxible-router";

if (process.env.BROWSER) {
  require("../style/Pages/PredictionsPage.scss");
}


class PredictionsPage extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="PredictionsPage">
        <div className="PredictionsPageContainer">
          <div className="Paper" style={{textAlign: 'center'}}>
            <div className="PaperTitle">
              PRONOSTIQUES
            </div>
            <div className="PredictionsPageContent">
              Test
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PredictionsPage = connectToStores(PredictionsPage, ["LoginPageStore"], (context) => {
  return {
    credentials: context.getStore("LoginPageStore").getCredentials()
  };
}, {getStore: PropTypes.func});

export default PredictionsPage;