import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { navigateAction, RouteStore } from "fluxible-router";
import Bouncefix from 'react-bouncefix';
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
    this.refs.ChatPage.childNodes[0].scrollTop = this.refs.ChatPage.childNodes[0].scrollHeight;
  }

  render() {
    const { data } = this.props;

    return (
      <div>
        {false && !data && <div className="LoaderContainer"><div className="Loader" /></div>}
        {true && !data && <div className="FootixLoader" />}
        <div   ref="ChatPage">
          <Bouncefix className="ChatPage">
            {data &&
              <div className="ChatPageContainer">
                <MessagesTab />
              </div>
            }
          </Bouncefix>
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
