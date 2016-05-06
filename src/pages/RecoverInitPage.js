import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { NavLink } from "fluxible-router";
import { recoverInitSend } from "../actions/Pages/RecoverInitAction";
import config from "../config";
import Labels from "../constants/Labels";

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
    this.context.executeAction(recoverInitSend, { username });
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
                  <div style={{marginTop: '18px'}}>
                    <a href="/login">
                      {Labels.logToDaily}
                    </a>
                  </div>
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