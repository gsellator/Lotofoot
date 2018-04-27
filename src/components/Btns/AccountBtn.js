import React, { Component } from "react";
import PropTypes from 'prop-types';
import AccountDialogAction from "../../actions/Dialog/AccountDialogAction";
import labels from "../../labels";

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
      <div onTouchTap={this.switchAccountDialog.bind(this)} className="AccountBtn" title={labels.logout}>
        <div className="btn-26 account"></div>
      </div>
    );
  }
}

export default AccountBtn;
