import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connectToStores } from "fluxible-addons-react";
import { navigateAction } from "fluxible-router";

import Zabivaka from "../components/Widgets/Zabivaka";
import labels from "../labels";

if (process.env.BROWSER) {
  require("../style/Pages/LoginPage.scss");
  require("../style/Pages/RegisterPage.scss");
}

class InactivePage extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  componentDidMount() {
    if (this.props.credentials && this.props.credentials.isActivated){
      const newroute = this.context.getStore("RouteStore").makePath('games');
      this.context.executeAction(navigateAction, { url: newroute });
    }
  }

  render() {
    return (
      <div className="LoginPage ScrollPage NoPadding RegisterPage">
        <div className="Login Register">
          <div className="Box">
            <form>
              <Zabivaka
                eyesPos={0}
                armsPos={false} />

              <div className="title">
                {labels.wellReceived}
              </div>
              <div className="text">
                {labels.registerSuccessText}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

InactivePage = connectToStores(InactivePage, ["LoginStore"], (context) => {
  return {
    credentials: context.getStore("LoginStore").getCredentials()
  };
}, {getStore: PropTypes.func});

export default InactivePage;