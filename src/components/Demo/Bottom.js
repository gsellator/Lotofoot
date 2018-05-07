import React, { Component } from "react";
import PropTypes from 'prop-types';
import { NavLink } from "fluxible-router";
import FormatDate from "daily-helpers/dist/FormatDate";

import labels from "../../labels";

if (process.env.BROWSER) {
  require("../../style/Demo/Bottom.scss");
}

class Bottom extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired,
  }

  render() {
    return (
      <footer className="Bottom">
        <div className="Content">
          <div className="First">
            <div className="Column">
              <a className="Title" href="https://github.com/ghislaindj/lotofoot-api" target="_blank">
                {labels.contribute.toUpperCase()}
              </a>
              <a className="Item" href="https://github.com/ghislaindj/lotofoot-api" target="_blank">
                API
              </a>
              <a className="Item" href="https://github.com/gsellator/lotofoot" target="_blank">
                Front
              </a>
            </div>

            <div className="Column">
              <a className="Title" href={'mailto:' + labels.contactEmail}>
                {labels.contactUs.toUpperCase()}
              </a>
              <a className="Item" href={'mailto:' + labels.contactEmail}>
                {labels.contactEmail}
              </a>
            </div>
          </div>

          <div className="Credit">
            <span className="Role">{labels.illustrations}</span>
            <a className="Name" href="https://fiacrebleu.com/" target="_blank">Fiacrebleu</a>
            <span className="Role">{labels.development}</span>
            <a className="Name" href="https://github.com/ghislaindj" target="_blank">@ghislaindj</a>
            <a className="Name" href="https://github.com/partomatl" target="_blank">@partomatl</a>
            <a className="Name" href="https://github.com/gsellator" target="_blank">@gsellator</a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Bottom;