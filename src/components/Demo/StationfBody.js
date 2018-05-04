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
      <div className="Body">
        StationfBody
      </div>
    );
  }
}

export default StationfBody;