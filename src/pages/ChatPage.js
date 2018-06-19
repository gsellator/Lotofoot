import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connectToStores } from "fluxible-addons-react";

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

    // Autoscroll at page's bottom after image loaded
    const page = this.refs.ChatPage;
    window.setTimeout(() => {
      page.scrollTop = page.scrollHeight;
    }, 500);
    window.setTimeout(() => {
      page.scrollTop = page.scrollHeight;
    }, 1000);
  }

  render() {
    const { credentials, data } = this.props;

    return (
      <div>
        {!data &&
          <div className="FootixLoader" />
        }

        <div ref="ChatPage" className="ScrollPage ChatPage">
          {data &&
            <div className="ChatPageContainer">
              <MessagesTab
                credentials={credentials}
                data={data} />
            </div>
          }
        </div>
        <MessageEdit />
      </div>
    );
  }
}

ChatPage = connectToStores(ChatPage, ["LoginStore", "MessagesTabStore"], (context) => {
  return {
    credentials: context.getStore("LoginStore").getCredentials(),
    data: context.getStore("MessagesTabStore").getData()
  };
}, {getStore: PropTypes.func});

export default ChatPage;
