import React, { Component } from "react";
import PropTypes from 'prop-types';

import NavAction from "../../actions/Pages/NavAction";
import NavHelper from "../Helpers/NavHelper";

if (process.env.BROWSER) {
  require("../../style/Pages/NavSummary.scss");
}

class NavSummary extends Component {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    executeAction: PropTypes.func.isRequired
  }

  switchNav(e) {
    this.context.executeAction(NavAction.switchNav);
    e.stopPropagation();
  }

  render() {
    const { sections } = this.props;
    const pageName = this.context.getStore("RouteStore").getCurrentRoute().name;

    return (
      <nav className="NavSummary">
        <div>
          {sections.map(sect =>
            <button className={pageName == sect.name ? 'NavLink active' : 'NavLink'} key={sect.name} onTouchTap={NavHelper.navToSectClick.bind(this, sect.name, sect.defaultView)}>
              <div className={'btn-26 ' + sect.name} title={sect.label}></div>
            </button>
          )}

          <button  className={(pageName == 'account') ? 'NavLink active' : 'NavLink'} onTouchTap={this.switchNav.bind(this)}>
            <div className="btn-26 more" title="Menu"></div>
          </button>
        </div>
      </nav>
    );
  }
}

export default NavSummary;