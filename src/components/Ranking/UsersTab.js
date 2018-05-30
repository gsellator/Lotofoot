import React, { Component } from "react";
import Filters from "daily-filters";

if (process.env.BROWSER) {
  require("../../style/Ranking/UsersTab.scss");
}


class UsersTab extends Component {
  render() {
    const { data, credentials } = this.props;

    return (
      <div className="Paper UsersTab">
        <div className="IlluContainer">
          <div className="Illu" />
        </div>
        {credentials && credentials._id &&
          <div>
            {data && data.map((item, i) =>
              <div key={i} className={credentials._id === item._id ? 'User Me' : 'User'}>
                <div className="Rank">
                  {'#' + (i+1)}
                </div>
                <div className="Firstname">
                  {Filters.capitalize(item.firstName) + ' ' + Filters.capitalize(item.lastName)}
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

export default UsersTab;
