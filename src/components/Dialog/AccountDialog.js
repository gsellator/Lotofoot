import React, { Component, PropTypes } from "react";
import { navigateAction, RouteStore } from "fluxible-router";
import { connectToStores } from "fluxible-addons-react";
import Labels from "../../Labels";
import Filters from "../Helpers/Filters";

if (process.env.BROWSER) {
  require("../../style/Dialog/AccountDialog.scss");
}

class AccountDialog extends Component {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    executeAction: PropTypes.func.isRequired
  }

  logout() {
    const newroute = this.context.getStore(RouteStore).makePath('logout');
    this.context.executeAction(navigateAction, { url: newroute });
  }

  render() {
    const { credentials } = this.props;
    const hasPaidString = undefined;// = credentials.hasPaid ? Labels.hasPaid : Labels.hasNotPaid;

    return (
      <div className="AccountDialog">
        <div className="AccountDialogArrow-1"></div>
        <div className="AccountDialogArrow-2"></div>
        <div className="AccountDialogCtnt">
          <div>
            <div className="icn-100 account"></div>
            <div className="AccountDialogInfos">
              {Filters.capitalize(credentials.firstName) + ' ' + Filters.capitalize(credentials.lastname)}
              <span>{credentials.username}</span>
              <span>{credentials.email}</span>
            </div>
          </div>

        <div className="AccountDialogActions">
          <a className="TxtBtn" onTouchTap={this.logout.bind(this)}>{Labels.logout}</a>
        </div>
        </div>
      </div>
    );
  }
}

AccountDialog = connectToStores(AccountDialog, ["LoginPageStore"], (context) => {
  return {
    credentials: context.getStore("LoginPageStore").getCredentials()
  };
}, {getStore: PropTypes.func});

export default AccountDialog;
