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
    const username = route.query.username;
    const password = route.query.password;
    if (username) {this.refs.loginInput.value = username;}
    if (password) {this.refs.passwordInput.value = password;}

    if (username && password) {
      this.context.executeAction(this.props.loginUser, { username, password });
    }

    this.refs.loginInput.focus();
  }

  send(e) {
    e.preventDefault();
    const route = this.context.getStore('RouteStore').getCurrentRoute();
    const username = this.refs.loginInput.value.replace(/ /g,'');
    const password = this.refs.passwordInput.value;
    this.context.executeAction(this.props.loginUser, { route, username, password });
  }

  render() {
    let { pending, appName, recoverUri, labels } = this.props;

    return (
      <div className="Login">
        <div className="Box">
          <form onSubmit={this.send.bind(this)}>
            <div className={'app-icn-l ' + appName}></div>
            <div>
              <input type="email" ref="loginInput" placeholder={labels.username} required
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
            <NavLink className="LoginLink" routeName="recoverInit">{labels.forgottenPassword}</NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;