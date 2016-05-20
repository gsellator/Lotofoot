import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { navigateAction, RouteStore } from "fluxible-router";
import Actions from "../constants/Actions";
import { getApi } from "../actions/Pages/ApiAction";

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
    const route = this.context.getStore("RouteStore").getCurrentRoute();
    this.context.executeAction(getApi, { route, view: 'GamesNext', action: Actions.APIOK_GAMES_NEXTMINI});
    this.context.executeAction(getApi, { route, view: 'Messages', action: Actions.APIOK_MESSAGES });
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    this.refs.ChatPage.scrollTop = this.refs.ChatPage.scrollHeight;
  }

  render() {
    const { data } = this.props;

    return (
      <div>
        {!data && <div className="LoaderContainer"><div className="Loader" /></div>}
        <div className="ChatPage" ref="ChatPage">
          {data &&
            <div className="ChatPageContainer">
              <MessagesTab />
            </div>
          }
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
