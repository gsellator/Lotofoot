import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connectToStores } from "fluxible-addons-react";
import { NavLink, RouteStore } from "fluxible-router";
import Actions from "../constants/Actions";
import ApiAction from "../actions/Pages/ApiAction";
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
    this.context.executeAction(ApiAction.getApi, { route, view: 'GamesNext', action: Actions.APIOK_GAMES_NEXTMINI});
  }

  render() {
    return (
      <div className="HelpPage">
        <div className="Paper">
          <div className="HelpPageCtnt">
            <div className="IlluContainer">
              <div className="Illu" />
            </div>
            <div className="FootixLoader" />
            <HelpBlock />
            <div className="Footer">
              En cas de problème ou pour toute question, contactez-nous à l'adresse <a href="mailto:hello@lotofoot.io">hello@lotofoot.io</a>.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//HelpPage = connectToStores(HelpPage, ["LoginStore"], (context) => {
//  return {
//    credentials: context.getStore("LoginStore").getCredentials()
//  };
//}, {getStore: PropTypes.func});

export default HelpPage;
