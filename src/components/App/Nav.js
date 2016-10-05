import React, { Component, PropTypes } from "react";
import { navigateAction, RouteStore } from "fluxible-router";
import { connectToStores } from "fluxible-addons-react";
import NavAction from "../../actions/Pages/NavAction";
import Sections from "../../constants/Sections";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import NavHelper from '../Helpers/NavHelper';
import Labels from "../../Labels";
import config from "../../config";

if (process.env.BROWSER) {
  require("../../style/App/Nav.scss");
}

class Nav extends Component {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    executeAction: PropTypes.func.isRequired
  }

  switchNav(e) {
    this.context.executeAction(NavAction.switchNav);
    e.stopPropagation();
  }

  render() {
    const { hasNav } = this.props;
    const pageName = this.context.getStore(RouteStore).getCurrentRoute().name;

    return (
      <div className="Nav">
          <nav className="NavSummary">
            {
              Sections.map(sect =>
                <div key={sect.name}>
                  <div className={sect.name.indexOf(pageName) == 0 ? 'NavLink active' : 'NavLink'} onTouchTap={NavHelper.navToSectClick.bind(this, sect.name)}>
                    <div className={'icn-26 ' + sect.name} title={Labels[sect.name]}></div>
                  </div>
                </div>
              )
            }

            <div  className={(pageName == 'settings' || pageName == 'help') ? 'NavLink active' : 'NavLink'} onTouchTap={this.switchNav.bind(this)}>
              <div>
                <div className="icn-26 more" title={Labels.menu}></div>
              </div>
            </div>
          </nav>
        <ReactCSSTransitionGroup transitionName="NavFullAnim" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {hasNav &&
            <nav className="NavFull">
              <div className="MainLink" onTouchTap={NavHelper.navToSectClick.bind(this, 'games')}>
                <div className={'icn-36 main full ' + config.appName}></div>
              </div>

              {Sections.map(sect =>
                <div key={sect.name}>
                  <div className={pageName == sect.name ? 'NavLink active' : 'NavLink'} onTouchTap={NavHelper.navToSectClick.bind(this, sect.name)}>
                    <div className={'icn-26 ' + sect.name}></div>
                    <span className="NavLinkTxt">{Labels[sect.name]}</span>
                  </div>
                </div>
              )}

              <div className="NavLinkSpacer"></div>
              <div className={pageName == 'help' ? 'NavLink active' : 'NavLink'} onTouchTap={NavHelper.navToSectClick.bind(this, 'help')}>
                <div className="icn-26 help"></div>
                <span className="NavLinkTxt">{Labels.rules}</span>
              </div>
            </nav>
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

Nav = connectToStores(Nav, ["NavStore"], (context) => {
  return {
    hasNav: context.getStore("NavStore").hasNav(),
  };
}, {getStore: PropTypes.func});

export default Nav;