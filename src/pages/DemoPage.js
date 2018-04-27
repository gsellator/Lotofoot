import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connectToStores } from "fluxible-addons-react";

//import DemoMainNav from "daily-demos/dist/js/DemoMainNav";
//import DemoBlock from "daily-demos/dist/js/DemoBlock";
//import DemoBottom from "daily-demos/dist/js/DemoBottom";

import config from "../config";

if (process.env.BROWSER) {
  require("../style/Pages/DemoPage.scss");
}

class DemoPage extends Component {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    executeAction: PropTypes.func.isRequired
  }

  render() {
    return (
      <div>
        <div className="ScrollPage NoPadding DemoPage">

          <div className="SmallText">
            <span>La france a gagné !</span>
            <span className="uiux-emojis 🙂 m-1"></span>
            <span className="uiux-emojis 🤫 m-1"></span>
            <span> Trop lol !</span>
          </div>

          <div className="SmallText" style={{ lineHeight: '38px' }}>
            <span>La france a gagné !</span>
            <span className="uiux-emojis 🙂 m-2"></span>
            <span className="uiux-emojis 🤫 m-2"></span>
            <span> Trop lol !</span>
          </div>

          <div className="SmallText" style={{ lineHeight: '38px' }}>
            <span className="uiux-emojis 🙂 m-6"></span>
          </div>

          {false &&
            <div>
              <div>
                <div className="uiux-emojis 🙂 m-1"></div>
                <div className="uiux-emojis 🙂 m-2"></div>
                <div className="uiux-emojis 🙂 m-3"></div>
                <div className="uiux-emojis 🙂 m-4"></div>
              </div>
              <div>
                <div className="uiux-emojis 🙁 m-1"></div>
                <div className="uiux-emojis 🙁 m-2"></div>
                <div className="uiux-emojis 🙁 m-3"></div>
                <div className="uiux-emojis 🙁 m-4"></div>
              </div>
              <div>
                <div className="uiux-emojis 🤓 m-1"></div>
                <div className="uiux-emojis 🤓 m-2"></div>
                <div className="uiux-emojis 🤓 m-3"></div>
                <div className="uiux-emojis 🤓 m-4"></div>
              </div>
              <div>
                <div className="uiux-emojis 😱 m-1"></div>
                <div className="uiux-emojis 😱 m-2"></div>
                <div className="uiux-emojis 😱 m-3"></div>
                <div className="uiux-emojis 😱 m-4"></div>
              </div>
              <div>
                <div className="uiux-emojis 🤫 m-1"></div>
                <div className="uiux-emojis 🤫 m-2"></div>
                <div className="uiux-emojis 🤫 m-3"></div>
                <div className="uiux-emojis 🤫 m-4"></div>
              </div>
              <div>
                <div className="uiux-emojis 🤫2 m-1"></div>
                <div className="uiux-emojis 🤫2 m-2"></div>
                <div className="uiux-emojis 🤫2 m-3"></div>
                <div className="uiux-emojis 🤫2 m-4"></div>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default DemoPage;