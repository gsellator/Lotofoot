import React, { Component } from "react";
import { NavLink } from "fluxible-router";
import PropTypes from 'prop-types';

import Zabivaka from "./Zabivaka";
import LoaderSmall from "./LoaderSmall";

if (process.env.BROWSER) {
  require("../../style/Widgets/Login.scss");
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      eyesPos: 0,
      armsPos: false,
    };
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired,
  }

  emailChanged(e) {
    const txt = e.target ? e.target.value : '';
    this.setState({
      email: txt,
      eyesPos: (txt.length + 1) < 36 ? (txt.length + 1) / 2 : 18,
    });
  }

  emailBlur() {
    this.setState({ eyesPos: 0 });
  }

  passwordChanged(e) {
    this.setState({ password: e.target.value });
  }

  passwordFocus(value) {
    this.setState({ armsPos: value });
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
    let { email, password } = this.state;

    return (
      <div className="Login">
        <div className="Box">
          <form onSubmit={this.send.bind(this)}>
            <Zabivaka
              eyesPos={this.state.eyesPos}
              armsPos={this.state.armsPos} />

            <div className="Input">
              <input type="email" ref="loginInput" value={email} onChange={this.emailChanged.bind(this)} placeholder={labels.email} required
                autoComplete="off" spellCheck="false" autoCorrect="off" autoCapitalize="off" maxLength="1024"
                onFocus={this.emailChanged.bind(this)} onBlur={this.emailBlur.bind(this)} />
            </div>
            <div className="Input">
              <input type="password" ref="passwordInput" value={password} onChange={this.passwordChanged.bind(this)} placeholder={labels.password} required
                autoComplete="off" spellCheck="false" autoCorrect="off" autoCapitalize="off" maxLength="1024"
                onFocus={this.passwordFocus.bind(this, true)} onBlur={this.passwordFocus.bind(this, false)} />
            </div>
            <div className="Button">
              {!pending &&
                <button type="submit">{labels.login}</button>
              }
              {pending &&
                <button type="submit">
                  <LoaderSmall />
                </button>
              }
            </div>
            <div className="Link">
              <NavLink className="LoginLink" routeName="recoverInit">
                {labels.forgottenPassword}
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;