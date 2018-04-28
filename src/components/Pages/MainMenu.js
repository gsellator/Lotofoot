import React, { Component } from "react";
import PropTypes from 'prop-types';
import { navigateAction, NavLink } from "fluxible-router";
import { connectToStores } from "fluxible-addons-react";

import NavAction from "../../actions/Pages/NavAction";
import config from "../../config";
import labels from "../../labels";

import HeaderBtn from "../Btns/HeaderBtn";

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
    this.context.executeAction(NavAction.switchNav);
  }

  goToGames(){
    const newroute = this.context.getStore("RouteStore").makePath('games');
    this.context.executeAction(navigateAction, { url: newroute });
  }

  render() {
    const { isPublic } = this.props;
    const route = this.context.getStore('RouteStore').getCurrentRoute();
    const routeName = route.name;
    const view = route.params.view;

    return (
      <div className="MainMenu">
        {!isPublic &&
          <menu className="MainMenuContent">
            <div className="Left">
              <div>
                <div className="Desktop" onTouchTap={this.switchNavClick.bind(this)}>
                  <div className={'btn-36 main ' + config.appName}></div>
                </div>
                <div className="Mobile" onTouchTap={this.goToGames.bind(this)}>
                  <div className="btn-26 main"></div>
                </div>
              </div>
            </div>
            <div className="Center">
              <HeaderBtn />
            </div>
            <div className="Right">

            </div>
          </menu>
        }

        {isPublic &&
          <menu className="MainMenuContent">
            <div className="Left">
              <div>
                <NavLink className="LoginLink" routeName="demo">
                  <div className="Desktop">
                    <div className={'btn-36 main full ' + config.appName}></div>
                  </div>
                  <div className="Mobile">
                    <div className="btn-26 main full"></div>
                  </div>
                </NavLink>
              </div>
            </div>
            <div className="Center">
            </div>
            <div className="Right">
              <NavLink className="MenuLink" routeName="register">
                {labels.createAccount}
              </NavLink>
              <NavLink className="MenuLink" routeName="login">
                {labels.login}
              </NavLink>
            </div>
          </menu>
        }
      </div>
    );
  }
}

export default MainMenu;
