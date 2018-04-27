import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connectToStores } from "fluxible-addons-react";
import { NavLink } from "fluxible-router";

import Register from "../components/Widgets/Register";

import RegisterAction from "../actions/Pages/RegisterAction";
import labels from "../labels";
import config from "../config";

if (process.env.BROWSER) {
  require("../style/Pages/LoginPage.scss");
  require("../style/Pages/RegisterPage.scss");
}

class RegisterPage extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  render() {
    const { pending } = this.props;

    return (
      <div className="LoginPage ScrollPage NoPadding RegisterPage">
        <Register
          appName={config.appName}
          pending={pending}
          labels={labels} />
      </div>
    );
  }
}

RegisterPage = connectToStores(RegisterPage, ["RegisterPageStore"], (context) => {
  return {
    pending: context.getStore("RegisterPageStore").getPending(),
  };
}, {getStore: PropTypes.func});

export default RegisterPage;
