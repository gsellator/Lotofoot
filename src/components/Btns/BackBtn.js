import React, { PropTypes, Component } from "react";
import Labels from "../../Labels";

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
        <div className="icn-26 back"></div>
        <div className="Label">{Labels.games}</div>
      </div>
    );
  }
}

export default BackBtn;