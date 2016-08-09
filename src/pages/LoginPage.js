import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { NavLink } from "fluxible-router";
import { loginUser } from "../actions/Pages/LoginAction";
import Labels from "../Labels";
import config from "../config";

if (process.env.BROWSER) {
  require("../style/Pages/LoginPage.scss");
  require("../style/Pages/LandingBack.scss");
}

class LoginPage extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }

  componentDidMount(){
    this.refs.loginInput.focus();
  }

  login(e) {
    e.preventDefault();
    const username = this.refs.loginInput.value.replace(/ /g,'');
    const password = this.refs.passwordInput.value;
    this.context.executeAction(loginUser, { username, password });
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
                <input type="text" ref="loginInput" placeholder={Labels.username} required
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

LoginPage = connectToStores(LoginPage, ["LoginPageStore"], (context) => {
  return {
    pending: context.getStore("LoginPageStore").getPending(),
  };
}, {getStore: PropTypes.func});

export default LoginPage;
