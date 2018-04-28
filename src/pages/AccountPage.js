import React, { Component } from "react";
import PropTypes from 'prop-types';
import { navigateAction } from "fluxible-router";
import { connectToStores } from "fluxible-addons-react";

import AccountBlock from "../components/Widgets/AccountBlock";

import Actions from "../constants/Actions";
import ApiAction from "../actions/Pages/ApiAction";
import config from "../config";
import labels from "../labels";

class AccountPage extends Component {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    executeAction: PropTypes.func.isRequired
  }

  logout() {
    const newroute = this.context.getStore("RouteStore").makePath('logout');
    this.context.executeAction(navigateAction, { url: newroute });
  }

  render() {
    const { credentials } = this.props;

    return (
      <div className="ScrollPage">
        <AccountBlock
          labels={labels}
          data={credentials}
          url={config.dldUri}
          email="hello@lotofoot.io"
          logout={this.logout.bind(this)} />
      </div>
    );
  }
}

AccountPage = connectToStores(AccountPage, ["LoginStore"], (context) => {
  return {
    credentials: context.getStore("LoginStore").getCredentials()
  };
}, {getStore: PropTypes.func});

export default AccountPage;