import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { NavLink } from "fluxible-router";
import { loginUser } from "../actions/Pages/LoginAction";
import config from "../config";
import Labels from "../constants/Labels";

if (process.env.BROWSER) {
  require("../style/Pages/LoginPage.scss");
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
      <div className="LoginPage">
        <div className="LoginPageContainer">
          <div className="LoginPageContent">
            <form onSubmit={this.login.bind(this)}>
              <div className="LoginLogo"></div>
              <div>
                <input type="text"
                  ref="loginInput"
                  placeholder={Labels.username}
                  autoComplete="on" spellCheck="false" autoCorrect="off" autoCapitalize="off" />
              </div>
              <div>
                <input type="password"
                  ref="passwordInput"
                  placeholder={Labels.password}
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
            </form>
          </div>
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