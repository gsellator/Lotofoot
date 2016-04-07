import React, { PropTypes, Component } from "react";
import Labels from "../../constants/Labels";

if (process.env.BROWSER) {
  require("../../style/Btns/HeaderBtn.scss");
}

class HeaderBtn extends Component {
  reload(){
    location.reload();
  }

  render() {
    return (
      <div className="HeaderBtn" onTouchTap={this.reload.bind(this)} title={Labels.refresh}>
        <div className="icn-20 refresh"></div>
      </div>
    );
  }
}

export default HeaderBtn;