import React, { PropTypes, Component } from "react";
import { navigateAction } from "fluxible-router";
import Labels from "../../constants/Labels";

if (process.env.BROWSER) {
  require("../../style/Btns/HeaderBtn.scss");
}

class HeaderBtn extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  reload(){
    const newroute = this.context.getStore("RouteStore").makePath('home');
    this.context.executeAction(navigateAction, { url: newroute });
  }

  render() {
    return (
      <div className="HeaderBtn" onTouchTap={this.reload.bind(this)} title={Labels.refresh}>
        <div className="icn-20 title"></div>
      </div>
    );
  }
}

export default HeaderBtn;
