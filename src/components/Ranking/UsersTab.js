import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { navigateAction, RouteStore } from "fluxible-router";

if (process.env.BROWSER) {
  require("../../style/Ranking/UsersTab.scss");
}


class UsersTab extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  render() {
    const { data } = this.props;

    return (
      <div className="UsersTab">
        {data && data.map((item, i) =>
          <div key={i} className="User">
            <span>{'#' + i + ' ' + item.firstName + ' - ' + item.email + ' -> ' + item.points}</span>
          </div>
        )}
      </div>
    );
  }
}

UsersTab = connectToStores(UsersTab, ["UsersTabStore"], (context) => {
  return {
    data: context.getStore("UsersTabStore").getData()
  };
}, {getStore: PropTypes.func});

export default UsersTab;