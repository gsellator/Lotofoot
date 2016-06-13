import React, { Component, PropTypes } from "react";
import { RouteStore } from "fluxible-router";
import Bouncefix from 'react-bouncefix';
import Sections from "../../constants/Sections";
import NavHelper from '../Helpers/NavHelper';
import Labels from "../../Labels";

if (process.env.BROWSER) {
  require("../../style/App/TabNav.scss");
}

class TabNav extends Component {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    executeAction: PropTypes.func.isRequired
  }

  render() {
    const pageName = this.context.getStore(RouteStore).getCurrentRoute().name;

    return (
      <Bouncefix className="TabNav">
        <nav className="TabNavContent">
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
              <div className="Label">{Labels.help}</div>
            </div>
          </div>
        </nav>
      </Bouncefix>
    );
  }
}

export default TabNav;