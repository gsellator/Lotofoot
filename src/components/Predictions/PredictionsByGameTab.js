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
    //    {false && <div>item._id : {item._id}</div>}
    //    {true && <div>item.scoreTeamA : {item.scoreTeamA}</div>}
    //    {true && <div>item.scoreTeamB : {item.scoreTeamB}</div>}
    //    {false && <div>item.winner : {item.winner}</div>}
    //    {false && <div>item.isOpen : {item.isOpen}</div>}
    //    {false && <div>item.createdAt : {item.createdAt}</div>}
    //    {false && <div>item.game._id : {item.game._id}</div>}
    //    {false && <div>item.game.friendlyId : {item.game.friendlyId}</div>}
    //    {false && <div>item.game.phase : {item.game.phase}</div>}
    //    {false && <div>item.game.datetime : {item.game.datetime}</div>}
    //    {false && <div>item.game.stadium : {item.game.stadium}</div>}
    //    {false && <div>item.game.teamA : {item.game.teamA}</div>}
    //    {false && <div>item.game.teamB : {item.game.teamB}</div>}
    //    {false && <div>item.game.scoreTeamA : {item.game.scoreTeamA}</div>}
    //    {false && <div>item.game.scoreTeamB : {item.game.scoreTeamB}</div>}
    //    {false && <div>item.game.winner : {item.game.winner}</div>}
    //    {false && <div>item.game.status : {item.game.status}</div>}

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
            <NavLink key={i} className="Prediction" routeName="game" navParams={{gameId: item.game._id}}>
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
            </NavLink>
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
