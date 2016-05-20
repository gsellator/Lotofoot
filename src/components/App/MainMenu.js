import React, { PropTypes, Component } from "react";
import { RouteStore, navigateAction } from "fluxible-router";
import { connectToStores } from "fluxible-addons-react";
import { switchNav } from "../../actions/Pages/NavAction";
import config from "../../config";

import RefreshBtn from "../Btns/RefreshBtn";
import HeaderBtn from "../Btns/HeaderBtn";
import AccountBtn from "../Btns/AccountBtn";

if (process.env.BROWSER) {
  require("../../style/App/MainMenu.scss");
}

class MainMenu extends Component {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    executeAction: PropTypes.func.isRequired
  }

  switchNavClick(e) {
    e.stopPropagation();
    this.context.executeAction(switchNav);
  }

  goToGames(){
    const newroute = this.context.getStore("RouteStore").makePath('games');
    this.context.executeAction(navigateAction, { url: newroute });
  }

  render() {
    const route = this.context.getStore(RouteStore).getCurrentRoute();
    const routeName = route.name;
    const view = route.params.view;

    return (
      <menu className="MainMenu">
        <div className="Left">
          <div>
            <div className="Desktop" onTouchTap={this.switchNavClick.bind(this)}>
              <div className={'icn-36 main ' + config.appName}></div>
            </div>
            <div className="Mobile" onTouchTap={this.goToGames.bind(this)}>
              <div className={'icn-26 main ' + config.appName}></div>
            </div>
          </div>
        </div>
        <div className="Center">
          <HeaderBtn />
        </div>
        <div className="Right">
          <div className="pixel loader"></div>
          <div className="pixel uiux_loader"></div>
          <div className="pixel uiux_icons"></div>
          <div className="pixel bordeaux"></div>
          <div className="pixel lens"></div>
          <div className="pixel lille"></div>
          <div className="pixel lyon"></div>
          <div className="pixel marseille"></div>
          <div className="pixel nice"></div>
          <div className="pixel paris"></div>
          <div className="pixel saint-denis"></div>
          <div className="pixel saint-etienne"></div>
          <div className="pixel toulouse"></div>
          <RefreshBtn />
          <AccountBtn />
        </div>
      </menu>
    );
  }
}

export default MainMenu;
