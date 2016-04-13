import React, { PropTypes, Component } from "react";
import { RouteStore } from "fluxible-router";
import { connectToStores } from "fluxible-addons-react";
import { switchNav } from "../../actions/Pages/NavAction";
import config from "../../config";

import BackBtn from "../Btns/BackBtn";
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

  render() {
    const route = this.context.getStore(RouteStore).getCurrentRoute();
    const routeName = route.getIn(["name"]);
    const view = route.getIn(["params", "view"]);

    let backBtn, headerBtn, refreshBtn, accountBtn;
    backBtn = <BackBtn />;
    headerBtn = <HeaderBtn />;
    refreshBtn = <RefreshBtn />;
    accountBtn = <AccountBtn />;

    return (
      <menu className="MainMenu">
        <div className="MainMenuTab">
          <div className="MainMenuLeft">
            {routeName != 'game' &&
              <div className="MainLink" onTouchTap={this.switchNavClick.bind(this)}>
                <div className="icn-36 main"></div>
              </div>
            }
            {routeName != 'game' &&
              <div className="MainLinkMobile" onTouchTap={this.switchNavClick.bind(this)}>
                <div className="icn-26 menu"></div>
              </div>
            }
            {routeName == 'game' &&
              backBtn
            }
          </div>

          <div className="MainMenuCenter">
            {refreshBtn}
            {headerBtn}
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
