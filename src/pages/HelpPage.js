import React, { Component } from "react";

import labels from "../labels";
import HelpBlock from "../components/Help/HelpBlock";

if (process.env.BROWSER) {
  require("../style/Pages/HelpPage.scss");
}

class HelpPage extends Component {
  render() {
    return (
      <div className="ScrollPage HelpPage">
        <div className="Paper">
          <div className="HelpPageCtnt">
            <div className="IlluContainer">
              <div className="Illu" />
            </div>

            <div className="FootixLoader" />

            <HelpBlock />

            <div className="Footer">
              <span>
                {labels.helpL4}
              </span>
              <a href={'mailto:' + labels.contactEmail}>
                {labels.contactEmail}
              </a>
              <span>.</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HelpPage;