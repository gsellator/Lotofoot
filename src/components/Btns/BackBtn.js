import React, { Component } from "react";
import PropTypes from 'prop-types';
import labels from "../../labels";
import GameModalHelper from "../Helpers/GameModalHelper";

if (process.env.BROWSER) {
  require("../../style/Btns/BackBtn.scss");
}

class BackBtn extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired,
  }

  //  goBack(){
  //    window.history.go(-1)
  //  }

  render() {
    return (
      <div className="BackBtn" onTouchTap={GameModalHelper.closeGameModal.bind(this)} title={labels.back}>
        <div className="btn-26 back"></div>
        <div className="Label">{labels.games}</div>
      </div>
    );
  }
}

export default BackBtn;