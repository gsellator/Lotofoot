import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connectToStores } from "fluxible-addons-react";

import Body from "../components/Demo/Body";
import StationfBody from "../components/Demo/StationfBody";
import Bottom from "../components/Demo/Bottom";

import Zabivaka from "../components/Widgets/Zabivaka";

import config from "../config";

if (process.env.BROWSER) {
  require("../style/Pages/DemoPage.scss");
}

class DemoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eyesPos: 0,
      armsPos: false,
    };
  }

  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    executeAction: PropTypes.func.isRequired
  }

  setEyesPos(){
    this.setState({ eyesPos: this.state.eyesPos < 18 ? this.state.eyesPos + 1 : 0 })
  }

  resetEyesPos(){
    this.setState({ eyesPos: 0 })
  }

  setArmsPos(){
    this.setState({ armsPos: !this.state.armsPos })
  }

  render() {
    let body= <Body />;
    switch(config.appName) {
      case 'lotofoot-pre':
        body = <Body />;
      break;
      case 'lotofoot':
        body = <Body />;
      break;
      case 'lotofoot-stationf':
        body = <StationfBody />;
      break;
    }

    return (
      <div>
        <div className="ScrollPage NoPadding DemoPage">
          <div className="Paper">
            <div className="TxtBtn" onTouchTap={this.resetEyesPos.bind(this)}>
              resetEyesPos
            </div>
            <div className="TxtBtn" onTouchTap={this.setEyesPos.bind(this)}>
              setEyesPos
            </div>
            <div className="TxtBtn" onTouchTap={this.setArmsPos.bind(this)}>
              setArmsPos
            </div>
          </div>

          <Zabivaka
            eyesPos={this.state.eyesPos}
            armsPos={this.state.armsPos} />

          {body}
          <Bottom />
        </div>
      </div>
    );
  }
}

export default DemoPage;