import React, { Component } from "react";
import PropTypes from 'prop-types';
import Loader from "react-daily-widgets/dist/js/Loader";

import LoginAction from "../actions/Pages/LoginAction";

class LogoutPage extends Component {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    executeAction: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const route = this.context.getStore("RouteStore").getCurrentRoute();
    this.context.executeAction(LoginAction.logout, { route });
  }

  render() {
    return (
      <div className="ScrollPage">
        <div className="Paper">
          <Loader />
        </div>
      </div>
    );
  }
}

export default LogoutPage;