import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connectToStores } from "fluxible-addons-react";
import { navigateAction } from "fluxible-router";

class HomePage extends Component {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    executeAction: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    if (this.props.credentials && this.props.credentials._id && this.props.credentials.emailValidated){
      const newroute = this.context.getStore("RouteStore").makePath('games');
      this.context.executeAction(navigateAction, { url: newroute });
    } else if (this.props.credentials && this.props.credentials._id) {
      const newroute = this.context.getStore("RouteStore").makePath('inactive');
      this.context.executeAction(navigateAction, { url: newroute });
    }
  }

  render() {
    return (
      <div className="HomePage">
        <div className="FootixLoader" />
      </div>
    );
  }
}

HomePage = connectToStores(HomePage, ["LoginStore"], (context) => {
  return {
    credentials: context.getStore("LoginStore").getCredentials()
  };
}, {getStore: PropTypes.func});

export default HomePage;
