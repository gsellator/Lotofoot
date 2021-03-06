import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connectToStores } from "fluxible-addons-react";
import io from "socket.io-client";

import NavAction from "../../actions/Pages/NavAction";
import Actions from "../../constants/Actions";
import ApiAction from "../../actions/Pages/ApiAction";


import MainMenu from "./MainMenu";
import Navs from "../../components/Pages/Navs";
import TabNav from "./TabNav";

import ModalWrap from "../../components/Modal/ModalWrap";
import DialogWrap from "../../components/Dialog/DialogWrap";

if (process.env.BROWSER) {
  require("../../style/Pages/Page.scss");
  require("../../style/Pages/Icons.scss");
  require("../../style/Pages/Flags.scss");
  require("../../style/Pages/Emojis.scss");
  require("../../style/Pages/Btn.scss");
  require("../../style/Pages/Footix.scss");
}

class Page extends Component {
  constructor(props) {
    super(props);
    this.socket;
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  componentDidMount(){
    this.socket = io.connect();

    this.socket.on('message', (data) => {
      console.log('new message received', data);
      const route = this.context.getStore("RouteStore").getCurrentRoute();
      this.context.executeAction(ApiAction.getApi, { route, view: 'Messages', action: Actions.APIOK_MESSAGES });
    });

    this.socket.on('game', (data) => {
      console.log('new game received', data);
      this.context.executeAction(ApiAction.getApi, { route, view: 'GamesNext', action: Actions.APIOK_GAMES_NEXTMINI });
      this.context.executeAction(ApiAction.getApi, { route, view: 'Games', action: Actions.APIOK_GAMES });
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
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
      pageName === 'error' ||
      pageName === 'inactive'
    );

    let pageClassName = 'Page';
    if (isPublic) {pageClassName += ' Public';}

    return (
      <div className={pageClassName} onClick={this.ckickHandler.bind(this)}>
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

        <ModalWrap />
        <DialogWrap />
      </div>
    );
  }
}

export default Page;