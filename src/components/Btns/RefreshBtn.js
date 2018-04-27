import React, { Component } from "react";
import PropTypes from 'prop-types';
import labels from "../../labels";

if (process.env.BROWSER) {
  require("../../style/Btns/RefreshBtn.scss");
}

class RefreshBtn extends Component {
  reload(){
    location.reload();
  }

  render() {
    return (
      <div className="RefreshBtn" onTouchTap={this.reload.bind(this)} title={labels.refresh}>
        <div className="icn-26 refresh"></div>
      </div>
    );
  }
}

export default RefreshBtn;