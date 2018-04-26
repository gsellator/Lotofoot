import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connectToStores } from "fluxible-addons-react";

import RecoverInit from "../components/Widgets/RecoverInit";

import RecoverAction from "../actions/Pages/RecoverAction";
import Labels from "../Labels";

if (process.env.BROWSER) {
  require("../style/Pages/LoginPage.scss");
}

class RecoverInitPage extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }

  render() {
    const { pending, success, email } = this.props;

    return (
      <div className="LoginPage ScrollPage NoPadding">
        <RecoverInit
          pending={pending}
          success={success}
          email={email}
          Labels={Labels}
          sendemail={RecoverAction.recoverInitSend} />
      </div>
    );
  }
}

RecoverInitPage = connectToStores(RecoverInitPage, ["RecoverInitPageStore"], (context) => {
  return {
    pending: context.getStore("RecoverInitPageStore").getPending(),
    success: context.getStore("RecoverInitPageStore").getSuccess(),
    email: context.getStore("RecoverInitPageStore").getEmail(),
  };
}, {getStore: PropTypes.func});

export default RecoverInitPage;
