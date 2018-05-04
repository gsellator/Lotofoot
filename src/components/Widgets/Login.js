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

  inputChanged(name, e) {
    const txt = e.target ? e.target.value : '';
    this.setState({
      [name]: txt,
      eyesPos: (txt.length + 1) < 36 ? (txt.length + 1) / 2 : 18,
    });
  }

  inputBlur() {
    this.setState({ eyesPos: 0 });
  }

  passwordFocus(value) {
    this.setState({ armsPos: value });
  }

  send(e) {
    e.preventDefault();
    const route = this.context.getStore('RouteStore').getCurrentRoute();
    this.context.executeAction(this.props.loginUser, { route, email: this.state.email.replace(/ /g,''), password: this.state.password });
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
              <input type="email" ref="loginInput" value={email} onChange={this.inputChanged.bind(this, 'email')} placeholder={labels.email} required
                autoComplete="off" spellCheck="false" autoCorrect="off" autoCapitalize="off" maxLength="1024"
                onFocus={this.inputChanged.bind(this, 'email')} onBlur={this.inputBlur.bind(this)} />
            </div>
            <div className="Input">
              <input type="password" ref="passwordInput" value={password} onChange={this.inputChanged.bind(this, 'password')} placeholder={labels.password} required
                autoComplete="off" spellCheck="false" autoCorrect="off" autoCapitalize="off" maxLength="1024"
                onFocus={this.passwordFocus.bind(this, true)} onBlur={this.passwordFocus.bind(this, false)} />
            </div>
            <div className="Button">
              {!pending &&
                <button type="submit">
                  {labels.login}
                </button>
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