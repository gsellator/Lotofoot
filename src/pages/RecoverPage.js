import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connectToStores } from "fluxible-addons-react";
import { navigateAction, NavLink } from "fluxible-router";

import Recover from "../components/Widgets/Recover";

import RecoverAction from "../actions/Pages/RecoverAction";
import DialogAction from "../actions/Dialog/DialogAction";
import labels from "../labels";

if (process.env.BROWSER) {
  require("../style/Pages/LoginPage.scss");
}

class RecoverPage extends Component {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    executeAction: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate(){
    if (this.props.initFailure){
      const newroute = this.context.getStore('RouteStore').makePath('recoverInit');
      this.context.executeAction(DialogAction.showDialog, { errorTxt: labels.recoverTokenInexistantError });
      this.context.executeAction(navigateAction, { url: newroute });
    }
  }

  render() {
    const { pending, success } = this.props;

    return (
      <div className="LoginPage ScrollPage NoPadding">
        <Recover
          pending={pending}
          success={success}
          labels={labels}
          sendPassword={RecoverAction.recoverUpdate} />
      </div>
    );
  }
}

RecoverPage = connectToStores(RecoverPage, ["RecoverPageStore"], (context) => {
  return {
    initFailure: context.getStore("RecoverPageStore").getInitFailure(),
    pending: context.getStore("RecoverPageStore").getPending(),
    success: context.getStore("RecoverPageStore").getSuccess(),
  };
}, {getStore: PropTypes.func});

export default RecoverPage;
