import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { navigateAction, RouteStore } from "fluxible-router";

if (process.env.BROWSER) {
  require("../../style/Games/GamesTab.scss");
}


class GamesTab extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  render() {
    const { data } = this.props;

    return (
      <div className="GamesTab">
        {data && data.map((item, i) =>
          <div key={i}>
            {item.teamA && item.teamB &&
              <div className="Match">
                <span>{item.teamA.name}</span>
                <span className="Flag"><img src={item.teamA.flagUrl} /></span>
                <span> - </span>
                <span className="Flag"><img src={item.teamB.flagUrl} /></span>
                <span>{item.teamB.name}</span>
              </div>
            }
          </div>
        )}
      </div>
    );
  }
}

GamesTab = connectToStores(GamesTab, ["GamesTabStore"], (context) => {
  return {
    data: context.getStore("GamesTabStore").getData()
  };
}, {getStore: PropTypes.func});

export default GamesTab;