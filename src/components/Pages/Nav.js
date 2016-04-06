import React, { Component, PropTypes } from "react";
import { navigateAction, RouteStore } from "fluxible-router";
import { connectToStores } from "fluxible-addons-react";
import { switchNav } from "../../actions/Pages/NavAction";
import Sections from "../../constants/Sections";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import config from "../../config";
import Helpers from '../Helpers';

if (process.env.BROWSER) {
  require("../../style/Pages/Nav.scss");
}

class Nav extends Component {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    executeAction: PropTypes.func.isRequired
  }

  switchNav(e) {
    this.context.executeAction(switchNav);
    e.stopPropagation();
  }

  render() {
    const { hasNav } = this.props;
    const pageName = this.context.getStore(RouteStore).getCurrentRoute().getIn(["name"]);

    return (
      <div className="Navs">
          <nav className="NavSummary">
            {
              Sections.map(sect =>
                <div key={sect.name}>
                  <div className={pageName == sect.name ? 'NavLink active' : 'NavLink'} onTouchTap={Helpers.navToSectClick.bind(this, sect.name)}>
                    <div className={'icn-26 ' + sect.name} title={sect.label}></div>
                  </div>
                </div>
              )
            }

            <div  className={(pageName == 'settings' || pageName == 'help') ? 'NavLink active' : 'NavLink'} onTouchTap={this.switchNav.bind(this)}>
              <div>
                <div className="icn-26 more" title="Menu"></div>
              </div>
            </div>
          </nav>
        <ReactCSSTransitionGroup transitionName="NavFullAnim" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {hasNav &&
            <nav className="NavFull">
              <div className="MainLink">
                <div className="icn-36 main full"></div>
              </div>

              {Sections.map(sect =>
                <div key={sect.name}>
                  <div className={pageName == sect.name ? 'NavLink active' : 'NavLink'} onTouchTap={Helpers.navToSectClick.bind(this, sect.name)}>
                    <div className={'icn-26 ' + sect.name}></div>
                    <span className="NavLinkTxt">{sect.label}</span>
                  </div>
                </div>
              )}

              <div className="NavLinkSpacer"></div>
              <div className={pageName == 'help' ? 'NavLink active' : 'NavLink'} onTouchTap={Helpers.navToSectClick.bind(this, 'help')}>
                <div className="icn-26 help"></div>
                <span className="NavLinkTxt">Aide</span>
              </div>
            </nav>
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

Nav = connectToStores(Nav, ["NavStore", "LoginPageStore"], (context) => {
  return {
    hasNav: context.getStore("NavStore").hasNav(),
    credentials: context.getStore("LoginPageStore").getCredentials()
  };
}, {getStore: PropTypes.func});

export default Nav;