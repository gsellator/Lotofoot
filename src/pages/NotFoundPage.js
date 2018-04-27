import React, { Component } from "react";
import labels from "../labels";
import Mire from "react-daily-widgets/dist/js/Mire";

if (process.env.BROWSER) {
  require("../style/Pages/NotFoundPage.scss");
}

class NotFoundPage extends Component {
  render() {
    return (
      <div className="ScrollPage NotFoundPage">
        <div className="Paper">
          <Mire mainLabel={labels.dailyMaj} />

          <div className="Texts">
            <div className="Text">
              {labels.notfoundPageL1}
            </div>
            <a className="OnBoardBtn" href="/">
              {labels.notfoundPageL2}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFoundPage;