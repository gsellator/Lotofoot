import React, { Component } from "react";
import PropTypes from 'prop-types';
import { NavLink } from "fluxible-router";

import Zabivaka from "./Zabivaka";
import LoaderSmall from "./LoaderSmall";

if (process.env.BROWSER) {
  require("../../style/Widgets/Login.scss");
}

class Recover extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  passwordFocus(value) {
    this.setState({ armsPos: value });
  }

  send(e) {
    e.preventDefault();
    const route = this.context.getStore('RouteStore').getCurrentRoute();
    this.context.executeAction(this.props.sendPassword, {
      route,
      recoverToken: route.params.recovertoken,
      email: this.props.email,
      password: this.state.password
    });
  }

  render() {
    let { pending, success, labels } = this.props;
    let { password } = this.state;

    return (
      <div className="Login">
        <div className="Box">
          <form onSubmit={this.send.bind(this)}>
            <Zabivaka
              eyesPos={this.state.eyesPos}
              armsPos={this.state.armsPos} />

            {!success &&
              <div>
                <div className="title">
                  {labels.recoverTitle}
                </div>
                <div className="Input">
                  <input type="password" ref="passwordInput" value={password} onChange={this.inputChanged.bind(this, 'password')} placeholder={labels.password} required
                    autoComplete="off" spellCheck="false" autoCorrect="off" autoCapitalize="off" maxLength="1024" 
                    onFocus={this.passwordFocus.bind(this, true)} onBlur={this.passwordFocus.bind(this, false)} />
                </div>
                <div className="Button">
                  {!pending &&
                    <button type="submit">{labels.resetPassword}</button>
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
                  {labels.recoverSuccessText}
                </div>
                <NavLink className="OnBoardBtn" routeName="home">
                  {labels.recoverSuccessAction}
                </NavLink>
              </div>
            }
          </form>
        </div>
      </div>
    );
  }
}

export default Recover;