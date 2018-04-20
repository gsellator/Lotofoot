import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connectToStores } from "fluxible-addons-react";
import { RouteStore, navigateAction, NavLink } from "fluxible-router";
import RecoverAction from "../actions/Pages/RecoverAction";
import Labels from "../Labels";

if (process.env.BROWSER) {
  require("../style/Pages/RecoverPage.scss");
//  require("../style/Pages/LandingBack.scss");
}

class RecoverPage extends Component {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    executeAction: PropTypes.func.isRequired
  }

  componentDidMount(){
    if (!this.props.initFailure && !this.props.success)
      this.refs.passwordInput.focus();
    this.componentDidUpdate();
  }

  componentDidUpdate(){
    if (this.props.initFailure){
      const newroute = this.context.getStore(RouteStore).makePath('recoverInit');
      this.context.executeAction(navigateAction, { url: newroute });
    }
  }

  sendPassword(e) {
    e.preventDefault();
    const route = this.context.getStore(RouteStore).getCurrentRoute();
    const password = this.refs.passwordInput.value;
    this.context.executeAction(RecoverAction.recoverUpdate, { route, password });
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

RecoverPage = connectToStores(RecoverPage, ["RecoverPageStore"], (context) => {
  return {
    initFailure: context.getStore("RecoverPageStore").getInitFailure(),
    pending: context.getStore("RecoverPageStore").getPending(),
    success: context.getStore("RecoverPageStore").getSuccess(),
    username: context.getStore("RecoverPageStore").getUsername(),
  };
}, {getStore: PropTypes.func});

export default RecoverPage;
