import React, { Component } from "react";
import PropTypes from 'prop-types';
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
          <div>
              La Coupe du Monde de football commence le 14 juin en Russie.
            </div>
            <div>
              Que vous soyez un expert du ballon rond ou un novice complet, rejoignez le Lotofoot de Station F pour pronostiquer le résultat des matchs, représenter votre programme mais surtout terrasser vos collègues.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StationfBody;