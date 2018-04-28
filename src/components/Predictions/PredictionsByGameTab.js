import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connectToStores } from "fluxible-addons-react";
import FormatDate from "../Helpers/FormatDate";
import Filters from "../Helpers/Filters";
import labels from "../../labels";

if (process.env.BROWSER) {
  require("../../style/Predictions/PredictionsByGameTab.scss");
}


class PredictionsByGameTab extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  render() {
    const { data, users, teamsData } = this.props;

    return (
      <div className="Paper PredictionsByGameTab">
        <div className="AltPaperTitle">
          <div className="Label">
            {labels.allPredictions}
          </div>
          <div className="icn-60 footix"></div>
        </div>

        <div>
          {data && data.map((item, i) =>
            <div key={i} className="Prediction">
              <div className="Left">
                <div className="Group">
                  {users && users[item.user] && Filters.capitalize(users[item.user].firstName) + ' ' + Filters.capitalize(users[item.user].lastName)}
                </div>
              </div>
              <div className="Center">
                {teamsData[item.game.teamA] &&
                  <div className="Team">
                    <div className="Flag">
                      <div className={'flag-12 ' + teamsData[item.game.teamA].slug} />
                   </div>
                  </div>
                }
                <div className="ScoreContainer">
                  <span className="Score">
                    <span>{(item.scoreTeamA || '0')}</span>
                    <span>&#8239;-&#8239;</span>
                    <span>{(item.scoreTeamB || '0')}</span>
                  </span>
                </div>
                {teamsData[item.game.teamB] &&
                  <div className="Team">
                    <div className="Flag">
                      <div className={'flag-12 ' + teamsData[item.game.teamB].slug} />
                    </div>
                  </div>
                }
              </div>
              <div className="Right">
                {item.score + ' pt'}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

PredictionsByGameTab = connectToStores(PredictionsByGameTab, ["PredictionsByGameTabStore", "TeamsDicoStore"], (context) => {
  return {
    data: context.getStore("PredictionsByGameTabStore").getData(),
    users: context.getStore("PredictionsByGameTabStore").getUsers(),
    teamsData: context.getStore("TeamsDicoStore").getData()
  };
}, {getStore: PropTypes.func});

export default PredictionsByGameTab;
