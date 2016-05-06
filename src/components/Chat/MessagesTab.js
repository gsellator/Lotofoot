import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { navigateAction, RouteStore } from "fluxible-router";
import FormatDate from "../Helpers/FormatDate";

if (process.env.BROWSER) {
  require("../../style/Chat/MessagesTab.scss");
}


class MessagesTab extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  render() {
    const { credentials, data } = this.props;

    return (
      <div className="MessagesTab">
        {credentials && credentials._id &&
          <div>
            {data && data.map((item, i) =>
              <div key={i} className="MessageLine">
                {item.user &&
                  <div className={credentials._id === item.user._id ? 'Me' : ''}>
                    <div className="MessageBlock">
                      <div className="Title">
                        <div className="Name">
                          {item.user && item.user.firstName}
                        </div>
                        <div className="Date">
                          {FormatDate.dtetimeToFromNow(item.createdAt, 'DD/MM')}
                        </div>
                      </div>
                      <div className="Text">
                        {item.text}
                      </div>
                      <div className="icn-16 Phylactery" />
                    </div>
                  </div>
                }
              </div>
            )}
          </div>
        }
      </div>
    );
  }
}

MessagesTab = connectToStores(MessagesTab, ["LoginPageStore", "MessagesTabStore"], (context) => {
  return {
    credentials: context.getStore("LoginPageStore").getCredentials(),
    data: context.getStore("MessagesTabStore").getData()
  };
}, {getStore: PropTypes.func});

export default MessagesTab;
