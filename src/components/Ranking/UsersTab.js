import React, { Component } from "react";
import Filters from "daily-filters";

import config from "../../config";
import stationfTeams from "../../constants/stationfTeams";
import dailyTeams from "../../constants/dailyTeams";

if (process.env.BROWSER) {
  require("../../style/Ranking/UsersTab.scss");
}


class UsersTab extends Component {
  render() {
    const { data, credentials } = this.props;
    const reg = /@.*/;

    let showTeam = false;
    let ref = {};
    switch(config.appName) {
      case 'lotofoot-stationf':
        showTeam = true;
        ref = stationfTeams.teamsRef();
      break;
      case 'lotofoot-daily':
        showTeam = true;
        ref = dailyTeams.teamsRef();
      break;
    };

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
                  {(i > 0 && data[i-1].points === item.points) ? '---' : '#' + (i+1)}
                </div>
                <div className="Player">
                  <span className="Name">
                    {Filters.capitalize(item.firstName) + ' ' + Filters.capitalize(item.lastName)}
                  </span>
                  {showTeam && item.email &&
                    <span className="Team">
                      {'| ' + ref[item.email.match(reg)] }
                    </span>
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

export default UsersTab;
