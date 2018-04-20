import React, { Component } from "react";

if (process.env.BROWSER) {
  require("../../style/Widgets/LoaderSmall.scss");
}

class LoaderSmall extends Component {
  render() {
    return (
      <div className="LoaderSmall">
        <div className="Dot"></div>
        <div className="Dot"></div>
        <div className="Dot"></div>
      </div>
    );
  }
}

export default LoaderSmall;