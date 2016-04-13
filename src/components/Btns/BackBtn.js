import React, { PropTypes, Component } from "react";
import Labels from "../../constants/Labels";

if (process.env.BROWSER) {
  require("../../style/Btns/BackBtn.scss");
}

class BackBtn extends Component {
  goBack(){
    window.history.go(-1)
  }

  render() {
    return (
      <div className="BackBtn" onTouchTap={this.goBack.bind(this)} title={Labels.back}>
        <div className="icn-20 back"></div>
      </div>
    );
  }
}

export default BackBtn;