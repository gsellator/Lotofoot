import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connectToStores } from "fluxible-addons-react";
import { NavLink } from "fluxible-router";

import Register from "../components/Widgets/Register";
import WhitelistRegister from "../components/Widgets/WhitelistRegister";

import RegisterAction from "../actions/Pages/RegisterAction";
import labels from "../labels";
import config from "../config";

import stationfTeams from "../constants/stationfTeams";
import dailyTeams from "../constants/dailyTeams";

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
    const { pending, success } = this.props;

    let register;
    switch(config.appName) {
      case 'lotofoot-stationf':
        register = <WhitelistRegister
          list={stationfTeams.teams}
          label="Please register with your Station F email."
          pending={pending}
          success={success}
          labels={labels}
          registerUser={RegisterAction.registerUser} />;
      break;

      case 'lotofoot-daily':
      default:
        register = <WhitelistRegister
          list={dailyTeams.teams}
          label="Merci de vous inscrire avec votre mail pro."
          pending={pending}
          success={success}
          labels={labels}
          registerUser={RegisterAction.registerUser} />;
      break;

      case 'lotofoot-pre':
      case 'lotofoot':
        register = <Register
          pending={pending}
          success={success}
          labels={labels}
          registerUser={RegisterAction.registerUser} />;
      break;
    }

    return (
      <div className="LoginPage ScrollPage NoPadding RegisterPage">
        {register}
      </div>
    );
  }
}

RegisterPage = connectToStores(RegisterPage, ["RegisterPageStore"], (context) => {
  return {
    pending: context.getStore("RegisterPageStore").getPending(),
    success: context.getStore("RegisterPageStore").getSuccess(),
  };
}, {getStore: PropTypes.func});

export default RegisterPage;
