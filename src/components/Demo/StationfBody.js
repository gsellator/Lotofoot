import React, { Component } from "react";
import PropTypes from 'prop-types';
import { NavLink } from "fluxible-router";

import labels from "../../labels";

if (process.env.BROWSER) {
  require("../../style/Demo/Body.scss");
}

class StationfBody extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className="Body StationfBody">
        <div className="IlluContainer">
          <div className="Illu" />
        </div>
        <div className="TextsContainer">
          <div className="Texts">
            <h2>
              <span>STATION F</span>
              <span className="Suffixe">OOT</span>
            </h2>
            <h3>
              06/14 - 07/15
            </h3>

            <p>
              Dear residents, the 2018 FIFA World Cup kicks off on June 14th in Russia. Whether you're a soccer expert or a complete novice, join StationFoot, Station F's prediction contest!
            </p>
            <div>
              <NavLink className="OnBoardBtn" activeClass="active" routeName="register">
                {labels.signUp}
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StationfBody;