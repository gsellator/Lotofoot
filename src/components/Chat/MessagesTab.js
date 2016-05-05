import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { navigateAction, RouteStore } from "fluxible-router";

if (process.env.BROWSER) {
  require("../../style/Chat/MessagesTab.scss");
}


class MessagesTab extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  render() {
    const { data } = this.props;

    return (
      <div className="Paper MessagesTab">
        <div className="AltPaperTitle">
          <div className="Label">
            Tous les messages
          </div>
          <div className="icn-60 footix"></div>
        </div>
        <div>
          {data && data.map((item, i) =>
            <div key={i} className="Message">
              <div className="Rank">
                {'#' + i}
              </div>
              <div className="Text">
                {item.text}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

MessagesTab = connectToStores(MessagesTab, ["MessagesTabStore"], (context) => {
  return {
    data: context.getStore("MessagesTabStore").getData()
  };
}, {getStore: PropTypes.func});

export default MessagesTab;
