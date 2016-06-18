import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { NavLink, RouteStore } from "fluxible-router";
import Bouncefix from 'react-bouncefix';
import Actions from "../constants/Actions";
import { getApi } from "../actions/Pages/ApiAction";
import config from "../config";

import HelpBlock from "../components/Help/HelpBlock";

if (process.env.BROWSER) {
  require("../style/Pages/HelpPage.scss");
}

class HelpPage extends Component {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    executeAction: PropTypes.func.isRequired
  }

  componentDidMount(){
    const route = this.context.getStore("RouteStore").getCurrentRoute();
    this.context.executeAction(getApi, { route, view: 'GamesNext', action: Actions.APIOK_GAMES_NEXTMINI});
  }

  render() {
    return (
      <Bouncefix className="HelpPage">
        <div className="Paper">
          <div className="HelpPageCtnt">
            <div className="IlluContainer">
              <div className="Illu" />
            </div>
            <div className="FootixLoader" />
            <HelpBlock />
            {(config.appName === 'lotofoot' || config.appName === 'lotofoot-dev' || config.appName === 'lotofoot-pre') &&
              <div className="Footer">
                En cas de problème ou pour toute question, contactez-nous à l'adresse <a href="mailto:hello@lotofoot.io">hello@lotofoot.io</a>.
              </div>
            }
            {config.appName === 'lotofoot-lecab' &&
              <div className="Footer">
                En cas de problème ou pour toute question, contactez-nous à l'adresse <a href="mailto:lecab@lotofoot.io">lecab@lotofoot.io</a>.
              </div>
            }
          </div>
        </div>
      </Bouncefix>
    );
  }
}

//HelpPage = connectToStores(HelpPage, ["LoginPageStore"], (context) => {
//  return {
//    credentials: context.getStore("LoginPageStore").getCredentials()
//  };
//}, {getStore: PropTypes.func});

export default HelpPage;
