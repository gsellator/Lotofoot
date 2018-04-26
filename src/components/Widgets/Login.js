import React, { Component } from "react";
import { NavLink } from "fluxible-router";
import PropTypes from 'prop-types';

import LoaderSmall from "./LoaderSmall";

if (process.env.BROWSER) {
  require("../../style/Widgets/Login.scss");
}

class Login extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired,
  }

  componentDidMount(){
    const route = this.context.getStore("RouteStore").getCurrentRoute();
    const email = route.query.email;
    const password = route.query.password;
    if (email) {this.refs.loginInput.value = email;}
    if (password) {this.refs.passwordInput.value = password;}

    if (email && password) {
      this.context.executeAction(this.props.loginUser, { email, password });
    }

    this.refs.loginInput.focus();
  }

  send(e) {
    e.preventDefault();
    const route = this.context.getStore('RouteStore').getCurrentRoute();
    const email = this.refs.loginInput.value.replace(/ /g,'');
    const password = this.refs.passwordInput.value;
    this.context.executeAction(this.props.loginUser, { route, email, password });
  }

  render() {
    let { pending, appName, labels } = this.props;

    return (
      <div className="Login">
        <div className="Box">
          <form onSubmit={this.send.bind(this)}>
            <div className={'app-icn-l ' + appName}></div>
            
            <div className="RegisterCall">
              <NavLink className="LoginButton" routeName="register">
                {labels.createAccount}
              </NavLink>
            </div>
            
            <div>
              <input type="email" ref="loginInput" placeholder={labels.email} required
                autoComplete="off" spellCheck="false" autoCorrect="off" autoCapitalize="off"/>
            </div>
            <div>
              <input type="password" ref="passwordInput" placeholder={labels.password} required
                autoComplete="off" spellCheck="false" autoCorrect="off" autoCapitalize="off"/>
            </div>
            {!pending &&
              <button type="submit">{labels.login}</button>
            }
            {pending &&
              <button type="submit">
                <LoaderSmall />
              </button>
            }
          </form>
          <div>
            <NavLink className="LoginLink" routeName="recoverInit">
              {labels.forgottenPassword}
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;