import React, { Component } from "react";
import labels from "../labels";
import Mire from "react-daily-widgets/dist/js/Mire";

if (process.env.BROWSER) {
  require("../style/Pages/ErrorPage.scss");
}

class ErrorPage extends Component {
  render() {
    return (
      <div className="ScrollPage ErrorPage Full">
        <div className="Paper">
          <Mire mainLabel={labels.dailyMaj} />

          <div className="Texts">
            <div className="Text">
              {labels.errorPageL1}
            </div>
            <a className="OnBoardBtn" href="/">
              {labels.errorPageL2}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorPage;