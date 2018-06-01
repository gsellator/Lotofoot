import React, { Component } from "react";
import PropTypes from 'prop-types';
import { NavLink } from "fluxible-router";

import labels from "../../labels";

if (process.env.BROWSER) {
  require("../../style/Demo/Body.scss");
}

class Body extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className="Body">
        <div className="IlluContainer">
          <div className="Illu" />
        </div>
        <div className="TextsContainer">
          <div className="Texts">
            <h2>
              <span>LOTOFOOT.</span>
              <span className="Suffixe">IO</span>
            </h2>
            <h3>
              06/14 - 07/15
            </h3>
            <p>
              La Coupe du Monde commence le 14 juin. Amis footix, rejoignez dès maintenant le grand Lotofoot de la coupe du monde 2018.
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

export default Body;