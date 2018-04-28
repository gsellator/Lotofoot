import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connectToStores } from "fluxible-addons-react";

//import config from "../../config";
import NavAction from "../../actions/Pages/NavAction";
//import NotifierAction from "../../actions/Pages/NotifierAction";
import NotificationComponent from './Notification';

import MainMenu from "./MainMenu";
import Navs from "../../components/Pages/Navs";
import TabNav from "./TabNav";

import ModalWrap from "../../components/Modal/ModalWrap";
import DialogWrap from "../../components/Dialog/DialogWrap";

if (process.env.BROWSER) {
  require("../../style/Pages/Page.scss");
  require("../../style/Pages/Icons.scss");
  require("../../style/Pages/Emojis.scss");
  require("../../style/Pages/Btn.scss");
  require("../../style/Pages/Footix.scss");
}

class Page extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  ckickHandler(e){
    if (this.context.getStore("NavStore").hasNav())
      this.context.executeAction(NavAction.closeNav);
  }

  render() {
    const route = this.context.getStore("RouteStore").getCurrentRoute();
    const pageName = route.name;
    const game = route.query.game;
    const isPublic = Boolean(
      pageName === 'login' ||
      pageName === 'demo' ||
      pageName === 'register' ||
      pageName === 'recoverInit' ||
      pageName === 'recover' ||
      pageName === 'notfound' ||
      pageName === 'error'
    );

    let pageClassName = 'Page';
    if (isPublic) {pageClassName += ' Public';}

    return (
      <div className={pageClassName} onTouchTap={this.ckickHandler.bind(this)}>
        <MainMenu
          isPublic={isPublic} />

        {!isPublic &&
          <Navs />
        }
        {!isPublic &&
          <TabNav />
        }

        <div className="Page-body">
          { this.props.children }
        </div>

        {<ModalWrap />}
        <DialogWrap />
      </div>
    );
  }
}

export default Page;