import React, { Component } from "react";
import PropTypes from 'prop-types';
import Sections from "../../constants/Sections";
import NavHelper from '../Helpers/NavHelper';
import labels from "../../labels";

if (process.env.BROWSER) {
  require("../../style/Pages/TabNav.scss");
}

class TabNav extends Component {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    executeAction: PropTypes.func.isRequired
  }

  render() {
    const pageName = this.context.getStore('RouteStore').getCurrentRoute().name;

    return (
      <div className="TabNav">
        <nav className="TabNavContent">
          {
            Sections.map(sect =>
              <div className="TabNavBtn" key={sect.name}>
                <div className={sect.name.indexOf(pageName) == 0 ? 'NavLink active' : 'NavLink'} onTouchTap={NavHelper.navToSectClick.bind(this, sect.name)}>
                  <div className={'icn-26 ' + sect.name} title={labels[sect.name]} />
                  <div className="Label">{labels[sect.name + 'Mini']}</div>
                </div>
              </div>
            )
          }

          <div className="TabNavBtn">
            <div className={pageName.indexOf('help') == 0 ? 'NavLink active' : 'NavLink'} onTouchTap={NavHelper.navToSectClick.bind(this, 'help')}>
              <div className="icn-26 help" title={labels.help} />
              <div className="Label">{labels.help}</div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default TabNav;