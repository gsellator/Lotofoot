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

    return (
      <menu className="MainMenu">
        {!isPublic &&
          <div className="MainMenuTab">
            <div className="MainMenuLeft">
              <div className="MainLink" onTouchTap={this.switchNavClick.bind(this)}>
                <div className={'btn-36 main ' + config.appName}></div>
              </div>
            </div>

            <div className="MainMenuCenter">
              <HeaderBtn />
            </div>
            <div className="MainMenuRight">
            </div>
          </div>
        }

        {isPublic &&
          <div className="MainMenuTab">
            <div className="MainMenuCenter">
              <NavLink className="MenuLink" routeName="home">
                <div className="MainLink">
                  <div className={'btn-36 main full ' + config.appName}></div>
                </div>
              </NavLink>
            </div>
            <div className="MainMenuRight">
              <NavLink className="MenuLink" activeClass="active" routeName="register">
                {labels.signUp}
              </NavLink>
              <NavLink className="MenuLink Featured" activeClass="active" routeName="login">
                {labels.login}
              </NavLink>
            </div>
          </div>
        }
      </menu>
    );
  }
}

export default MainMenu;
