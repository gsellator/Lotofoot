import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connectToStores } from "fluxible-addons-react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import NavAction from "../../actions/Pages/NavAction";
import AccountDialogAction from "../../actions/Dialog/AccountDialogAction";
import NotificationComponent from './Notification';

import MainMenu from "./MainMenu";
import Nav from "./Nav";
import TabNav from "./TabNav";
import Dialog from "../../components/Dialog/Dialog";
import AccountDialog from "../../components/Dialog/AccountDialog";
import GameModal from "../../components/Games/GameModal";


if (process.env.BROWSER) {
  require("../../style/Pages/Page.scss");
  require("../../style/Pages/Icons.scss");
  require("../../style/Pages/Btn.scss");
}

class Page extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  ckickHandler(e){
    if (this.props.hasNav)
      this.context.executeAction(NavAction.closeNav);
    if (this.props.hasAccountDialog)
      this.context.executeAction(AccountDialogAction.closeAccountDialog);
  }

  render() {
    const pageName = this.context.getStore('RouteStore').getCurrentRoute().name;
    const { hasDialog, hasAccountDialog, hasGameModal } = this.props;

    let mainMenu, nav, tabnav, body, dialog, accountDialog, gameModal;
    if (pageName != 'login' && pageName != 'register' && pageName != 'recoverInit' && pageName != 'recover') {
      mainMenu = <MainMenu />;
      nav = <Nav />;
      tabnav = <TabNav />;
    }
    if (hasDialog) {dialog = <Dialog key="1"/>;}
    if (hasAccountDialog) {accountDialog = <AccountDialog />;}
    if (hasGameModal) {gameModal = <GameModal />;}

    return (
      <div className={'Page ' + pageName} onTouchTap={this.ckickHandler.bind(this)}>

        <ReactCSSTransitionGroup transitionName="MainMenuAnim" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          {mainMenu}
        </ReactCSSTransitionGroup>

        <ReactCSSTransitionGroup transitionName="AccountDialogAnim" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          {accountDialog}
        </ReactCSSTransitionGroup>

        <ReactCSSTransitionGroup transitionName="NavAnim" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          {nav}
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup transitionName="TabNavAnim" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          {tabnav}
        </ReactCSSTransitionGroup>

        <div className="Page-body">
          { this.props.children }
        </div>

        <ReactCSSTransitionGroup transitionName="GameModalAnim" transitionEnterTimeout={500} transitionLeaveTimeout={800}>
          {gameModal}
        </ReactCSSTransitionGroup>

        <ReactCSSTransitionGroup transitionName="DialogAnim" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          {dialog}
        </ReactCSSTransitionGroup>

        <NotificationComponent />
      </div>
    );
  }
}

Page = connectToStores(Page, ["LoginStore", "NavStore", "DialogStore", "AccountDialogStore"], (context) => {
  return {
    credentials: context.getStore("LoginStore").getCredentials(),
    hasNav: context.getStore("NavStore").hasNav(),
    hasDialog: context.getStore("DialogStore").hasDialog(),
    hasAccountDialog: context.getStore("AccountDialogStore").hasAccountDialog(),
    hasGameModal: context.getStore("GameModalStore").getHasGameModal(),
  };
}, {getStore: PropTypes.func});

export default Page;
