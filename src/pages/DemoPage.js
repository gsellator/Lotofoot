import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connectToStores } from "fluxible-addons-react";

import Body from "../components/Demo/Body";
import StationfBody from "../components/Demo/StationfBody";
import Bottom from "../components/Demo/Bottom";

import config from "../config";

if (process.env.BROWSER) {
  require("../style/Pages/DemoPage.scss");
}

class DemoPage extends Component {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    executeAction: PropTypes.func.isRequired
  }

  render() {
    let body= <Body />;
    switch(config.appName) {
      case 'lotofoot-pre':
        body = <Body />;
      break;
      case 'lotofoot':
        body = <Body />;
      break;
      case 'lotofoot-stationf':
        body = <StationfBody />;
      break;
    }

    return (
      <div>
        <div className="ScrollPage NoPadding DemoPage">
          {body}
          <Bottom />
        </div>
      </div>
    );
  }
}

export default DemoPage;