import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { navigateAction, RouteStore } from "fluxible-router";

import MessagesTab from "../components/Chat/MessagesTab";

if (process.env.BROWSER) {
  require("../style/Pages/ChatPage.scss");
}


class ChatPage extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="ChatPage">
        <div className="ChatPageContainer">
          <MessagesTab />
        </div>
      </div>
    );
  }
}

//ChatPage = connectToStores(ChatPage, ["LoginPageStore"], (context) => {
//  return {
//    credentials: context.getStore("LoginPageStore").getCredentials()
//  };
//}, {getStore: PropTypes.func});

export default ChatPage;