import React, { Component } from "react";
import PropTypes from 'prop-types';
import { NavLink } from "fluxible-router";

import LoaderSmall from "./LoaderSmall";

if (process.env.BROWSER) {
  require("../../style/Widgets/Login.scss");
}

class RecoverInit extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '' };
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired,
  }

  componentDidMount(){
    if (!this.props.success)
      this.refs.emailInput.focus();
  }

  send(e) {
    e.preventDefault();
    const route = this.context.getStore('RouteStore').getCurrentRoute();
    const email = this.refs.emailInput.value.replace(/ /g,'');
    this.context.executeAction(this.props.sendemail, { route, email });
    this.setState({ email });
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
                  {Labels.recoverInitTitle}
                </div>
                <div className="text">
                  {Labels.recoverInitText}
                </div>
                <div>
                  <input type="email" ref="emailInput" placeholder={Labels.emailExample} required
                    autoComplete="on" spellCheck="false" autoCorrect="off" autoCapitalize="off" />
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
                  {Labels.recoverInitTitleOk}
                </div>
                <div className="text">
                  {Labels.recoverInitTextOk + this.state.email + '.'}
                </div>
              </div>
            }
          </form>
          <div>
            {!success &&
              <NavLink className="LoginLink" routeName="login">
                {Labels.backHome}
              </NavLink>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default RecoverInit;