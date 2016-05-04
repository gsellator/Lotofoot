import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { NavLink, navigateAction, RouteStore } from "fluxible-router";
import FormatDate from "../Helpers/FormatDate";
import Filters from "../Helpers/Filters";

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
            Tous les pronostiques
          </div>
          <div className="icn-60 footix"></div>
        </div>

        <div className="PredictionsPageContent">
          {data && data.map((item, i) =>
            <div key={i} className="Prediction">
              <div className="Left">
                <div className="Group">{Filters.capitalize(users[item.user])}</div>
              </div>
              <div className="Center">
                {teamsData[item.game.teamA] &&
                  <div className="Team">
                    <div className="Flag"><img src={teamsData[item.game.teamA].flagUrl} /></div>
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
                    <div className="Flag"><img src={teamsData[item.game.teamB].flagUrl} /></div>
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

PredictionsByGameTab = connectToStores(PredictionsByGameTab, ["PredictionsByGameTabStore"], (context) => {
  return {
    data: context.getStore("PredictionsByGameTabStore").getData(),
    users: context.getStore("PredictionsByGameTabStore").getUsers(),
    teamsData: context.getStore("TeamsDicoStore").getData()
  };
}, {getStore: PropTypes.func});

export default PredictionsByGameTab;
