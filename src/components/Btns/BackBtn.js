import React, { Component } from "react";
import PropTypes from 'prop-types';
import Labels from "../../Labels";
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
      <div className="BackBtn" onTouchTap={GameModalHelper.closeGameModal.bind(this)} title={Labels.back}>
        <div className="icn-26 back"></div>
        <div className="Label">{Labels.games}</div>
      </div>
    );
  }
}

export default BackBtn;