import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { NavLink, RouteStore } from "fluxible-router";
import HelpBlock from "../components/Help/HelpBlock";

if (process.env.BROWSER) {
  require("../style/Pages/HelpPage.scss");
}

class HelpPage extends Component {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    executeAction: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="HelpPage">
        <div className="Paper">
          <div className="PaperTitle">
             Règles du jeu
          </div>
          <div className="HelpPageCtnt">
            <HelpBlock />
            <div className="Footer">
              En cas de problème ou pour toute question, contactez-nous à l'adresse <a href="mailto:hello@lotofoot.radio97.fr">hello@lotofoot.radio97.fr</a>.
            </div>
          </div>
        </div>
        <div className="Illu" />
      </div>
    );
  }
}

//HelpPage = connectToStores(HelpPage, ["LoginPageStore"], (context) => {
//  return {
//    credentials: context.getStore("LoginPageStore").getCredentials()
//  };
//}, {getStore: PropTypes.func});

export default HelpPage;
