import React, { Component } from "react";
import PropTypes from 'prop-types';
import { navigateAction, RouteStore } from "fluxible-router";
import { connectToStores } from "fluxible-addons-react";
import labels from "../../labels";
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
    const newroute = this.context.getStore('RouteStore').makePath('logout');
    this.context.executeAction(navigateAction, { url: newroute });
  }

  render() {
    const { credentials } = this.props;

    return (
      <div className="AccountDialog">
        <div className="AccountDialogArrow-1"></div>
        <div className="AccountDialogArrow-2"></div>
        <div className="AccountDialogCtnt">
          <div>
            <div className="icn-100 account"></div>
            <div className="AccountDialogInfos">
              {Filters.capitalize(credentials.firstName) + ' ' + Filters.capitalize(credentials.lastname)}
              <span>{credentials.email}</span>
              <span>{credentials.email}</span>
            </div>
          </div>

        <div className="AccountDialogActions">
          <a className="TxtBtn" onTouchTap={this.logout.bind(this)}>{labels.logout}</a>
        </div>
        </div>
      </div>
    );
  }
}

AccountDialog = connectToStores(AccountDialog, ["LoginStore"], (context) => {
  return {
    credentials: context.getStore("LoginStore").getCredentials()
  };
}, {getStore: PropTypes.func});

export default AccountDialog;
