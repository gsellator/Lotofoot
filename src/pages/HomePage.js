import React, { PropTypes, Component } from "react";
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
        <div className="LoaderContainer"><div className="Loader" /></div>
      </div>
    );
  }
}

export default HomePage;
