import React, { Component } from "react";

class LogoutPage extends Component {
  componentDidMount() {
    window.location.href = "/logout"
  }

  render() {
    return (
      <div className="LogoutPage">
      </div>
    );
  }
}

export default LogoutPage;
