import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { navigateAction, RouteStore } from "fluxible-router";
import Filters from "../Helpers/Filters";

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
        {credentials && credentials._id &&
          <div>
            {data && data.map((item, i) =>
              <div key={i} className={credentials._id === item._id ? 'User Me' : 'User'}>
                <div className="Rank">
                  {'#' + (i+1)}
                </div>
                <div className="Firstname">
                  {Filters.capitalize(item.firstName) + ' ' + Filters.capitalize(item.lastName)
                  }
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
