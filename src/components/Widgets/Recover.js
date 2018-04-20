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
      username: this.props.username,
      password: this.refs.passwordInput.value
    });
  }

  render() {
    let { pending, success, username, groupName, Labels } = this.props;

    return (
      <div className="Login">
        <div className="Box">
          <form onSubmit={this.send.bind(this)}>
            {!success &&
              <div>
                <div className="title">
                  {Labels.recoverTitle}
                </div>
                {groupName === 'tf1' &&
                  <div className="text">
                    {Labels.recoverPageRegex}
                  </div>
                }
                <div>
                  <input type="password" ref="passwordInput" placeholder={groupName === 'tf1' ? Labels.passwordTf1 : Labels.password} required
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
                  {Labels.renewSuccessTitle}
                </div>
                <div className="text">
                  {Labels.renewSuccessText}
                </div>
                <NavLink className="OnBoardBtn" routeName="index">
                  {Labels.renewSuccessAction}
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