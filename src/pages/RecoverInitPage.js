import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connectToStores } from "fluxible-addons-react";

import RecoverInit from "react-daily-widgets/dist/js/RecoverInit";

import RecoverAction from "../actions/Pages/RecoverAction";
import Labels from "../Labels";

if (process.env.BROWSER) {
  require("../style/Pages/RecoverInitPage.scss");
}

class RecoverInitPage extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }

  render() {
    const { pending, success, username } = this.props;

    return (
      <div className="LoginPage ScrollPage NoPadding">
        <RecoverInit
          pending={pending}
          success={success}
          username={username}
          Labels={Labels}
          sendUsername={RecoverAction.recoverInitSend} />
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
