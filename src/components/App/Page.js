import React, { Component, PropTypes } from "react";
import { connectToStores } from "fluxible-addons-react";
import { RouteStore } from "fluxible-router";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { getAccessToken } from "../../actions/Pages/LoginAction";
import { closeNav } from "../../actions/Pages/NavAction";
import { closeAccountDialog } from "../../actions/Dialog/AccountDialogAction";

import MainMenu from "../../components/App/MainMenu";
import Nav from "../../components/App/Nav";
import TabNav from "../../components/App/TabNav";
import Dialog from "../../components/Dialog/Dialog";
import AccountDialog from "../../components/Dialog/AccountDialog";
import NotificationComponent from './Notification';

if (process.env.BROWSER) {
  require("../../style/App/Page.scss");
  require("../../style/App/Icons.scss");
  require("../../style/App/Btn.scss");
}

class Page extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  ckickHandler(e){
    if (this.props.hasNav)
      this.context.executeAction(closeNav);
    if (this.props.hasAccountDialog)
      this.context.executeAction(closeAccountDialog);
  }

  render() {
    const pageName = this.context.getStore(RouteStore).getCurrentRoute().getIn(["name"]);
    const { isLogged, hasDialog, hasAccountDialog } = this.props;

    let mainMenu, nav, tabnav, body, dialog, accountDialog;
    if (pageName != 'login' && pageName != 'userRegister' && pageName != 'recoverInit' && pageName != 'recover') {
      mainMenu = <MainMenu />;
      nav = <Nav />;
      tabnav = <TabNav />;
    }
    if (hasDialog) {dialog = <Dialog key="1"/>;}
    if (hasAccountDialog) {accountDialog = <AccountDialog />;}

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

        <ReactCSSTransitionGroup transitionName="DialogAnim" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          {dialog}
        </ReactCSSTransitionGroup>

        <NotificationComponent />
      </div>
    );
  }
}

Page = connectToStores(Page, ["LoginPageStore", "NavStore", "DialogStore", "AccountDialogStore"], (context) => {
  return {
    isLogged: context.getStore("LoginPageStore").isLoggedIn(),
    credentials: context.getStore("LoginPageStore").getCredentials(),
    hasNav: context.getStore("NavStore").hasNav(),
    hasDialog: context.getStore("DialogStore").hasDialog(),
    hasAccountDialog: context.getStore("AccountDialogStore").hasAccountDialog(),
  };
}, {getStore: PropTypes.func});

export default Page;
