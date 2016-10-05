import React, { PropTypes, Component } from "react";
import AccountDialogAction from "../../actions/Dialog/AccountDialogAction";
import Labels from "../../Labels";

if (process.env.BROWSER) {
  require("../../style/Btns/AccountBtn.scss");
}

class AccountBtn extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }

  switchAccountDialog(e) {
    this.context.executeAction(AccountDialogAction.switchAccountDialog);
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
