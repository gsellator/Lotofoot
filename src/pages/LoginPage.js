import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connectToStores } from "fluxible-addons-react";
import { CSSTransitionGroup } from 'react-transition-group';

import Login from "../components/Widgets/Login";

import LoginAction from "../actions/Pages/LoginAction";
import config from "../config";
import Labels from "../Labels";

if (process.env.BROWSER) {
  require("../style/Pages/LoginPage.scss");
}

class LoginPage extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired,
  }

  render() {
    const { pending } = this.props;

    return (
      <div className="LoginPage ScrollPage NoPadding">
        <Login
          pending={pending}
          appName={config.appName}
          loginUser={LoginAction.login}
          labels={Labels} />
      </div>
    );
  }
}

LoginPage = connectToStores(LoginPage, ["LoginStore"], (context) => {
  return {
    pending: context.getStore("LoginStore").getPending(),
  };
}, {getStore: PropTypes.func});

export default LoginPage;
