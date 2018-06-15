import React, { Component } from "react";
import Filters from "daily-filters";

import labels from "../../labels";
import config from "../../config";
import stationfTeams from "../../constants/stationfTeams";
import dailyTeams from "../../constants/dailyTeams";

if (process.env.BROWSER) {
  require("../../style/Predictions/PredictionsByGameTab.scss");
}


class PredictionsByGameTab extends Component {
  render() {
    const { data, users, teamsData } = this.props;
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
      <div className="Paper PredictionsByGameTab">
        <div className="PaperTitle" style={{ marginBottom: '0' }}>
          {labels.allPredictions}
        </div>

        {data && data.map((item, i) =>
          <div key={i} className="Item">
            {users && users[item.user] &&
              <div className="Left">
                <span className="Rank">
                  {(i > 0 && data[i-1].score === item.score) ? '---' : '#' + (i+1)}
                </span>
                <span className="Name">
                  {Filters.capitalize(users[item.user].firstName) + ' ' + Filters.capitalize(users[item.user].lastName)}
                </span>
                {users[item.user].email &&
                  <span className="Team">
                    {'| ' + ref[users[item.user].email.match(reg)] }
                  </span>
                }
              </div>
            }

            {teamsData && teamsData[item.game.teamA] && teamsData[item.game.teamB] &&
              <div className="Right">
                <span className="Prediction">
                  <div className="Team">
                    <div className={'flag f-12 ' + teamsData[item.game.teamA].slug} />
                  </div>

                  <div className="ScoreContainer">
                    {(item.scoreTeamA || '0') + ' - ' + (item.scoreTeamB || '0')}
                  </div>

                  <div className="Team">
                    <div className={'flag f-12 ' + teamsData[item.game.teamB].slug} />
                  </div>

                  <span  className="Points">
                    {item.score + ' pt'}
                  </span>
                </span>
              </div>
            }
          </div>
        )}

      </div>
    );
  }
}

export default PredictionsByGameTab;
