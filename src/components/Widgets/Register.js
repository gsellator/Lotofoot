import React, { Component } from "react";
import PropTypes from 'prop-types';
import { NavLink } from "fluxible-router";

import Zabivaka from "./Zabivaka";
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
    this.context.executeAction(this.props.registerUser, {
      route,
      email: this.state.email,
      password: this.state.password,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
    });
  }

  render() {
    const { pending, success, labels } = this.props;
    const { email, password, firstname, lastname } = this.state;

    return (
      <div className="Login">
        <div className="Box">
          <form onSubmit={this.send.bind(this)}>
            <Zabivaka
              eyesPos={this.state.eyesPos}
              armsPos={this.state.armsPos} />

            {!success &&
              <div>
                <div className="Input">
                  <div className="Label">{labels.email}</div>
                  <input type="email" value={email} onChange={this.inputChanged.bind(this, 'email')} ref="emailInput" required
                  placeholder={labels.required} autoComplete="off" spellCheck="false" autoCorrect="off" autoCapitalize="on" maxLength="1024"
                  onFocus={this.inputChanged.bind(this, 'email')} onBlur={this.inputBlur.bind(this)} />
                </div>

                <div className="Input">
                  <div className="Label">{labels.firstname}</div>
                  <input type="text" value={firstname} onChange={this.inputChanged.bind(this, 'firstname')} required
                  placeholder={labels.required} autoComplete="off" spellCheck="false" autoCorrect="off" autoCapitalize="off" maxLength="1024"
                  onFocus={this.inputChanged.bind(this, 'firstname')} onBlur={this.inputBlur.bind(this)} />
                </div>

                <div className="Input">
                  <div className="Label">{labels.lastname}</div>
                  <input type="text" value={lastname} onChange={this.inputChanged.bind(this, 'lastname')} required
                  placeholder={labels.required} autoComplete="off" spellCheck="false" autoCorrect="off" autoCapitalize="off" maxLength="1024"
                  onFocus={this.inputChanged.bind(this, 'lastname')} onBlur={this.inputBlur.bind(this)} />
                </div>

                <div className="Input">
                  <div className="Label">{labels.password}</div>
                  <input type="password" value={password} onChange={this.inputChanged.bind(this, 'password')} required
                  placeholder={labels.required} autoComplete="off" spellCheck="false" autoCorrect="off" autoCapitalize="off" maxLength="1024"
                  onFocus={this.passwordFocus.bind(this, true)} onBlur={this.passwordFocus.bind(this, false)} />
                </div>

                <div className="Button">
                  {!pending &&
                    <button type="submit">
                      {labels.createAccount}
                    </button>
                  }
                  {pending &&
                    <button type="submit">
                      <LoaderSmall />
                    </button>
                  }
                </div>
              </div>
            }

            {success &&
              <div>
               <div className="title">
                  {labels.wellReceived}
                </div>
                <div className="text">
                  {labels.registerSuccessText}
                </div>
                <NavLink className="OnBoardBtn" routeName="home">
                  {labels.registerSuccessAction}
                </NavLink>
              </div>
            }
          </form>
          }
        </div>
      </div>
    );
  }
}

export default Register;

