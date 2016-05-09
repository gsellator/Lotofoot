import React, { PropTypes, Component } from "react";
import Labels from "../../constants/Labels";

if (process.env.BROWSER) {
  require("../../style/Btns/RefreshBtn.scss");
}

class RefreshBtn extends Component {
  reload(){
    location.reload();
  }

  render() {
    return (
      <div className="RefreshBtn" onTouchTap={this.reload.bind(this)} title={Labels.refresh}>
        <div className="icn-26 refresh"></div>
      </div>
    );
  }
}

export default RefreshBtn;