import React, { Component } from "react";
import PropTypes from 'prop-types';
import { navigateAction } from "fluxible-router";

class HomePage extends Component {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    executeAction: PropTypes.func.isRequired
  }

  componentDidMount() {
    const newroute = this.context.getStore("RouteStore").makePath('games');
    this.context.executeAction(navigateAction, { url: newroute });
  }

  render() {
    return (
      <div className="HomePage">
      {false && <div className="LoaderContainer"><div className="Loader" /></div>}
      {true && <div className="FootixLoader" />}
      </div>
    );
  }
}

export default HomePage;
