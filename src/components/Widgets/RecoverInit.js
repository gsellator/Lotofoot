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
    let { pending, success, email, labels } = this.props;

    return (
      <div className="Login">
        <div className="Box">
          <form onSubmit={this.send.bind(this)}>
            {!success &&
              <div>
                <div className="title">
                  {labels.recoverInitTitle}
                </div>
                <div className="text">
                  {labels.recoverInitText}
                </div>
                <div>
                  <input type="email" ref="emailInput" placeholder={labels.emailExample} required
                    autoComplete="on" spellCheck="false" autoCorrect="off" autoCapitalize="off" />
                </div>
                {!pending &&
                  <button type="submit">{labels.resetPassword}</button>
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
                  {labels.recoverInitTitleOk}
                </div>
                <div className="text">
                  {labels.recoverInitTextOk + this.state.email + '.'}
                </div>
              </div>
            }
          </form>
          <div>
            {!success &&
              <NavLink className="LoginLink" routeName="login">
                {labels.backHome}
              </NavLink>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default RecoverInit;