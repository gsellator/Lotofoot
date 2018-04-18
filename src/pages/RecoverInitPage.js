import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connectToStores } from "fluxible-addons-react";
import { NavLink } from "fluxible-router";
import RecoverInitAction from "../actions/Pages/RecoverInitAction";
import Labels from "../Labels";

if (process.env.BROWSER) {
  require("../style/Pages/RecoverInitPage.scss");
  require("../style/Pages/LandingBack.scss");
}

class RecoverInitPage extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }

  componentDidMount(){
    if (!this.props.success)
      this.refs.usernameInput.focus();
  }

  sendUsername(e) {
    e.preventDefault();
    const username = this.refs.usernameInput.value;
    this.context.executeAction(RecoverInitAction.recoverInitSend, { username });
  }

  render() {
    const { pending, success, username } = this.props;

    return (
      <div className="RecoverInitPage LandingBack">
        <div className="RecoverInitPageContainer">
          <div className="RecoverInitPageContent">
            <form onSubmit={this.sendUsername.bind(this)}>
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
                      <div className="Loader"></div>
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
                  <div className="text">
                    {Labels.recoverInitTextOk2}
                  </div>
                </div>
              }

              <div>
                <NavLink className="LoginLink" routeName="login">{Labels.backHome}</NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

RecoverInitPage = connectToStores(RecoverInitPage, ["RecoverInitPageStore"], (context) => {
  return {
    pending: context.getStore("RecoverInitPageStore").getPending(),
    success: context.getStore("RecoverInitPageStore").getSuccess(),
    username: context.getStore("RecoverInitPageStore").getUsername(),
  };
}, {getStore: PropTypes.func});

export default RecoverInitPage;
