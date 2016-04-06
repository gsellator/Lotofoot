import React, { PropTypes, Component } from "react";
import { switchAccountDialog } from "../../actions/Dialog/AccountDialogAction";
import Labels from "../../constants/Labels";

if (process.env.BROWSER) {
  require("../../style/Btns/AccountBtn.scss");
}

class AccountBtn extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }
  
  switchAccountDialog(e) {
    this.context.executeAction(switchAccountDialog);
    e.stopPropagation();
  }
  
  render() {
    return (
      <div onTouchTap={this.switchAccountDialog.bind(this)} className="AccountBtn" title={Labels.logout}>
        <div className="icn-26 account"></div>
      </div>
    );
  }
}

export default AccountBtn;