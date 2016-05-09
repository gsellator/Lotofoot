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
    const { data, credentials } = this.props;

    return (
      <div className="Paper UsersTab">
        <div className="AltPaperTitle">
          <div className="Label">
            Le classement
          </div>
          <div className="icn-60 footix"></div>
        </div>
        {credentials && credentials._id &&
          <div>
            {data && data.map((item, i) =>
              <div key={i} className={credentials._id === item._id ? 'User Me' : 'User'}>
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
        }
      </div>
    );
  }
}

UsersTab = connectToStores(UsersTab, ["LoginPageStore", "UsersTabStore"], (context) => {
  return {
    credentials: context.getStore("LoginPageStore").getCredentials(),
    data: context.getStore("UsersTabStore").getData()
  };
}, {getStore: PropTypes.func});

export default UsersTab;
