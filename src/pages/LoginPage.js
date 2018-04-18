import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connectToStores } from "fluxible-addons-react";
import { NavLink } from "fluxible-router";

import LoginAction from "../actions/Pages/LoginAction";
import Labels from "../Labels";
import config from "../config";

if (process.env.BROWSER) {
  require("../style/Pages/LoginPage.scss");
  require("../style/Pages/LandingBack.scss");
}

class LoginPage extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired,
  }

  componentDidMount(){
    this.refs.loginInput.focus();
  }

  login(e) {
    const route = this.context.getStore("RouteStore").getCurrentRoute();
    e.preventDefault();
    const username = this.refs.loginInput.value.replace(/ /g,'');
    const password = this.refs.passwordInput.value;
    this.context.executeAction(LoginAction.login, { route, username, password });
  }

  render() {
    const { pending } = this.props;

    return (
      <div className="LoginPage LandingBack">
        <div className="LoginPageContainer">
          <div className="LoginPageContent">
            <form onSubmit={this.login.bind(this)}>
              <div className={'LoginLogo ' + config.appName}></div>

              {config.appName === 'lotofoot-lecab' &&
                <div>
                  <div>
                    <NavLink className="Button" routeName="userRegister">{Labels.createAccount}</NavLink>
                  </div>
                  <div className="ButtonGroup">
                    <span className="LoginLinkSpacer">Seuls les chauffeurs-partenaires LeCab pourront recevoir les lots mis en jeu</span>
                  </div>
                </div>
              }

              <div>
                <input type="email" ref="loginInput" placeholder={Labels.username} required
                  autoComplete="on" spellCheck="false" autoCorrect="off" autoCapitalize="off" />
              </div>
              <div>
                <input type="password" ref="passwordInput" placeholder={Labels.password} required
                  autoComplete="on" spellCheck="false" autoCorrect="off" autoCapitalize="off"/>
              </div>
              {!pending &&
                <button type="submit">{Labels.login}</button>
              }
              {pending &&
                <button type="submit">
                  <div className="Loader"></div>
                </button>
              }

              <div>
                <NavLink className="LoginLink" routeName="recoverInit">{Labels.forgottenPassword}</NavLink>
              </div>
            </form>
          </div>
          <div className="pixel loader"></div>
          <div className="pixel uiux_loader"></div>
          <div className="pixel uiux_icons"></div>
          <div className="pixel uiux_footix"></div>
          <div className="pixel bordeaux"></div>
          <div className="pixel lens"></div>
          <div className="pixel lille"></div>
          <div className="pixel lyon"></div>
          <div className="pixel marseille"></div>
          <div className="pixel nice"></div>
          <div className="pixel paris"></div>
          <div className="pixel saint-denis"></div>
          <div className="pixel saint-etienne"></div>
          <div className="pixel toulouse"></div>
        </div>
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
