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
              The 2018 FIFA World Cup begins on June 14th in Russia.
            </p>
            <p>
              Que vous soyez un expert du ballon rond ou un novice complet, rejoignez le Lotofoot de Station F pour pronostiquer le résultat des matchs, représenter votre programme mais surtout terrasser vos collègues.
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