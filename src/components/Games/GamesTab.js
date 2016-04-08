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
          <div key={i} className="Match">
            {item.teamA && item.teamA.name} - {item.teamB && item.teamB.name}
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