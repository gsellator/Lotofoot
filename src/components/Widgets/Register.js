import React, { Component } from "react";
import PropTypes from 'prop-types';
import { NavLink } from "fluxible-router";

import LoaderSmall from "./LoaderSmall";

if (process.env.BROWSER) {
  require("../../style/Widgets/Login.scss");
}

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstname: '',
      lastname: '',
      password: ''
    };
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired,
  }

  emailChanged(e) {
    this.setState({email: e.target.value});
  }

  firstnameChanged(e) {
    this.setState({firstname: e.target.value});
  }

  lastnameChanged(e) {
    this.setState({lastname: e.target.value});
  }

  passwordChanged(e) {
    this.setState({password: e.target.value});
  }

  registerUser(e) {
    e.preventDefault();
    const body = {
      email: this.state.email,
      password: this.state.password,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
    }
    this.context.executeAction(RegisterAction.registerUser, { body });
  }

  render() {
    const { appName, pending, labels } = this.props;
    const { email, password, firstname, lastname } = this.state;

    return (
      <div className="Login">
        <div className="Box">
          <form onSubmit={this.registerUser.bind(this)}>
            <div className={'icn-70 ' + appName}></div>

            <div className="Input">
              <div className="Label">Email</div>
              <input type="email" value={email} onChange={this.emailChanged.bind(this)} ref="emailInput" required
              placeholder={labels.required} autoComplete="off" spellCheck="false" autoCorrect="off" autoCapitalize="on" maxLength="1024"/>
            </div>

            <div className="Input">
              <div className="Label">Prénom</div>
              <input type="text" value={firstname} onChange={this.firstnameChanged.bind(this)} required
              placeholder={labels.required} autoComplete="off" spellCheck="false" autoCorrect="off" autoCapitalize="off" maxLength="1024"/>
            </div>

            <div className="Input">
              <div className="Label">Nom</div>
              <input type="text" value={lastname} onChange={this.lastnameChanged.bind(this)} required
              placeholder={labels.required} autoComplete="off" spellCheck="false" autoCorrect="off" autoCapitalize="off" maxLength="1024"/>
            </div>

            <div className="Input">
              <div className="Label">Mot de passe</div>
              <input type="password" value={password} onChange={this.passwordChanged.bind(this)} required
              placeholder={labels.required} autoComplete="off" spellCheck="false" autoCorrect="off" autoCapitalize="off" maxLength="1024" />
            </div>

            {!pending &&
              <button type="submit">{labels.createAccount}</button>
            }
            {pending &&
              <button type="submit">
                <div className="Loader"></div>
              </button>
            }

            <div>
              <NavLink className="LoginLink" routeName="login">{labels.backHome}</NavLink>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;

