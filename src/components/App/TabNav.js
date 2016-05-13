import React, { Component, PropTypes } from "react";
import { navigateAction, RouteStore } from "fluxible-router";
import { connectToStores } from "fluxible-addons-react";
import Sections from "../../constants/Sections";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import config from "../../config";
import NavHelper from '../Helpers/NavHelper';
import Labels from "../../constants/Labels";

if (process.env.BROWSER) {
  require("../../style/App/TabNav.scss");
}

class TabNav extends Component {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    executeAction: PropTypes.func.isRequired
  }

  render() {
    const pageName = this.context.getStore(RouteStore).getCurrentRoute().getIn(["name"]);

    return (
      <nav className="TabNav">
        {
          Sections.map(sect =>
            <div className="TabNavBtn" key={sect.name}>
              <div className={sect.name.indexOf(pageName) == 0 ? 'NavLink active' : 'NavLink'} onTouchTap={NavHelper.navToSectClick.bind(this, sect.name)}>
                <div className={'icn-26 ' + sect.name} title={Labels[sect.name]} />
                <div className="Label">{Labels[sect.name + 'Mini']}</div>
              </div>
            </div>
          )
        }

        <div className="TabNavBtn">
          <div className={pageName.indexOf('help') == 0 ? 'NavLink active' : 'NavLink'} onTouchTap={NavHelper.navToSectClick.bind(this, 'help')}>
            <div className="icn-26 help" title={Labels.help} />
            <div className="Label">Aide</div>
          </div>
        </div>
      </nav>
    );
  }
}

//Nav = connectToStores(Nav, ["NavStore", "LoginPageStore"], (context) => {
//  return {
//    credentials: context.getStore("LoginPageStore").getCredentials()
//  };
//}, {getStore: PropTypes.func});

export default TabNav;