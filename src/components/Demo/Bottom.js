import React, { Component } from "react";
import PropTypes from 'prop-types';
import { NavLink } from "fluxible-router";
import FormatDate from "daily-helpers/dist/FormatDate";

import labels from "../../labels";
import config from "../../config";

if (process.env.BROWSER) {
  require("../../style/Demo/Bottom.scss");
}

class Bottom extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired,
  }

  render() {
    const isStationf = Boolean(config.appName === 'lotofoot-stationf');
    
    return (
      <footer className="Bottom">
        <div className="Content">
          <div className="Title">
            {labels.broughtToYou.toUpperCase()}
          </div>
          <div className="First">
            <div className="Column">
              <a href="https://www.startupflow.io/" target="_blank">
                <div className="icn-100 startupflow"></div>
              </a>
            </div>
            <div className="Column">
              <a href="https://www.dailydinities.fr/" target="_blank">
                <div className="icn-100 daily"></div>
              </a>
            </div>
            {isStationf &&
              <div className="Column">
                <a href="https://stationf.groupe-tf1.fr/" target="_blank">
                  <div className="icn-100 tf1"></div>
                </a>
              </div>
            }
            {isStationf &&
              <div className="Column">
                <a href="https://www.techshoplm.fr/" target="_blank">
                  <div className="png-100 techshop"></div>
                </a>
              </div>
            }
          </div>

          {true &&isStationf &&
            <div className="First">
              <div className="Column">
                <a href="https://www.funkyveggie.fr/" target="_blank">
                  <div className="png-100 funky-veggie"></div>
                </a>
              </div>
              <div className="Column">
                <a href="https://www.frereslauzea.com/" target="_blank">
                  <div className="png-100 freres-lauzea"></div>
                </a>
              </div>
              <div className="Column">
                <a href="https://fr-fr.facebook.com/FbStationF/" target="_blank">
                  <div className="png-100 startup-garage"></div>
                </a>
              </div>
              {false && <div className="Column">
                <a href="https://stationf.co/" target="_blank">
                  <div className="png-100 stationf"></div>
                </a>
              </div>}
              {false && <div className="Column">
                <a href="https://www.laposte.fr/" target="_blank">
                  <div className="png-100 laposte"></div>
                </a>
              </div>}
              {false && <div className="Column">
                <a href="https://www.microsoft.com/fr-fr" target="_blank">
                  <div className="png-100 microsoft"></div>
                </a>
              </div>}
            </div>
          }

          <div className="Credit">
            <span className="Role">{labels.illustrations}</span>
            <a className="Name" href="https://fiacrebleu.com/" target="_blank">Fiacrebleu</a>
            <span className="Role">{labels.development}</span>
            <a className="Name" href="https://github.com/ghislaindj" target="_blank">@ghislaindj</a>
            <a className="Name" href="https://github.com/partomatl" target="_blank">@partomatl</a>
            <a className="Name" href="https://github.com/gsellator" target="_blank">@gsellator</a>
            <span className="Role">{labels.contactUs}</span>
            <a className="Name" href={'mailto:' + labels.contactEmail} target="_blank">{labels.contactEmail}</a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Bottom;