import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { navigateAction, RouteStore } from "fluxible-router";

import MessagesTab from "../components/Chat/MessagesTab";
import MessageEdit from "../components/Chat/MessageEdit";

if (process.env.BROWSER) {
  require("../style/Pages/ChatPage.scss");
}

class ChatPage extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    this.refs.ChatPage.scrollTop = this.refs.ChatPage.scrollHeight;
  }

  render() {
    return (
      <div>
        <div className="ChatPage" ref="ChatPage">
          <div className="ChatPageContainer">
            <MessagesTab />
          </div>
        </div>
        <MessageEdit />
      </div>
    );
  }
}

ChatPage = connectToStores(ChatPage, ["MessagesTabStore"], (context) => {
  return {
    data: context.getStore("MessagesTabStore").getData()
  };
}, {getStore: PropTypes.func});

export default ChatPage;