import React, { Component } from "react";
import PropTypes from 'prop-types';
import { NavLink } from "fluxible-router";
import LoaderSmall from "./LoaderSmall";

if (process.env.BROWSER) {
  require("../../style/Widgets/Login.scss");
}

class Recover extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired,
  }

  componentDidMount(){
    if (!this.props.initFailure && !this.props.success)
      this.refs.passwordInput.focus();
  }

  send(e) {
    e.preventDefault();
    const route = this.context.getStore('RouteStore').getCurrentRoute();
    this.context.executeAction(this.props.sendPassword, {
      route,
      recoverToken: route.params.recovertoken,
      email: this.props.email,
      password: this.refs.passwordInput.value
    });
  }

  render() {
    let { pending, success, email, Labels } = this.props;

    return (
      <div className="Login">
        <div className="Box">
          <form onSubmit={this.send.bind(this)}>
            {!success &&
              <div>
                <div className="title">
                  {Labels.recoverTitle}
                </div>
                <div>
                  <input type="password" ref="passwordInput" placeholder={Labels.password} required
                    autoComplete="off" spellCheck="false" autoCorrect="off" autoCapitalize="off"/>
                </div>
                {!pending &&
                  <button type="submit">{Labels.resetPassword}</button>
                }
                {pending &&
                  <button type="submit">
                    <LoaderSmall />
                  </button>
                }
              </div>
            }

            {success &&
              <div>
               <div className="title">
                  {Labels.recoverSuccessTitle}
                </div>
                <div className="text">
                  {Labels.recoverSuccessText}
                </div>
                <NavLink className="OnBoardBtn" routeName="home">
                  {Labels.recoverSuccessAction}
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