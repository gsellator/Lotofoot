import React, { Component } from "react";
import PropTypes from 'prop-types';
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
            <div>
              La Coupe du Monde commence le 14 juin.
            </div>
            <div>
              Rejoignez dès maintenant le grand Lotofoot de la coupe du monde 2018.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Body;