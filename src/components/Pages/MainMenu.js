import React, { PropTypes, Component } from "react";
import { RouteStore } from "fluxible-router";
import { connectToStores } from "fluxible-addons-react";
import { switchNav } from "../../actions/Pages/NavAction";
import config from "../../config";
import Helpers from '../Helpers';

import RefreshBtn from "../Btns/RefreshBtn";
import HeaderBtn from "../Btns/HeaderBtn";
import AccountBtn from "../Btns/AccountBtn";

if (process.env.BROWSER) {
  require("../../style/Pages/MainMenu.scss");
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

  render() {
    const route = this.context.getStore(RouteStore).getCurrentRoute();
    const routeName = route.getIn(["name"]);
    const view = route.getIn(["params", "view"]);

    let headerBtn, refreshBtn, accountBtn;
    headerBtn = <HeaderBtn />;
    //    refreshBtn = <RefreshBtn />;
    accountBtn = <AccountBtn />;

    return (
      <menu className="MainMenu">
        <div className="MainMenuTab">
          <div className="MainMenuLeft">
            <div className="MainLink" onTouchTap={this.switchNavClick.bind(this)}>
              <div className="icn-36 main"></div>
            </div>
            <div className="MainLinkMobile" onTouchTap={this.switchNavClick.bind(this)}>
              <div className="icn-26 menu"></div>
            </div>
          </div>

          <div className="MainMenuCenter">
            {headerBtn}
            {refreshBtn}
          </div>
          <div className="MainMenuRight">
            {accountBtn}
          </div>
        </div>
      </menu>
    );
  }
}

export default MainMenu;
