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
      <div className="Paper UsersTab">
        <div className="AltPaperTitle">
          <div className="Label">
            Le classement
          </div>
          <div className="icn-60 footix"></div>
        </div>
        <div>
          {data && data.map((item, i) =>
            <div key={i} className="User">
              <div className="Rank">
                {'#' + i}
              </div>
              <div className="Firstname">
                {item.firstName}
              </div>
              <div className="Email">
                {item.email}
              </div>
              <div className="Points">
                {item.points}
              </div>
            </div>
          )}
        </div>
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
