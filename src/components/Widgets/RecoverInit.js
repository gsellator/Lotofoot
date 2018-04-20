import React, { Component } from "react";
import PropTypes from 'prop-types';
import LoaderSmall from "./LoaderSmall";

if (process.env.BROWSER) {
  require("../../style/Widgets/Login.scss");
}

class RecoverInit extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired,
  }

  componentDidMount(){
    if (!this.props.success)
      this.refs.usernameInput.focus();
  }

  send(e) {
    e.preventDefault();
    const route = this.context.getStore('RouteStore').getCurrentRoute();
    const username = this.refs.usernameInput.value.replace(/ /g,'');
    this.context.executeAction(this.props.sendUsername, { route, username });
  }

  render() {
    let { pending, success, username, Labels } = this.props;

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
                  <input type="email" ref="usernameInput" placeholder={Labels.usernameExample} required
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
                  {Labels.recoverInitTextOk + username + '.'}
                </div>
              </div>
            }
          </form>
          <div>
            {!success &&
              <a className="LoginLink" href="/login">
                {Labels.logToDaily}
              </a>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default RecoverInit;