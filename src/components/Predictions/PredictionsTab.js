import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { NavLink, navigateAction, RouteStore } from "fluxible-router";
import FormatDate from "../Helpers/FormatDate";
import Filters from "../Helpers/Filters";

if (process.env.BROWSER) {
  require("../../style/Predictions/PredictionsTab.scss");
}


class PredictionsTab extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  render() {
    const { currentGame, data, teamsData } = this.props;

    return (
      <div className="Paper PredictionsTab">
        <div className="AltPaperTitle">
          <div className="Label">
            Tous mes pronostics
          </div>
          <div className="icn-60 footix"></div>
        </div>

        <div className="PredictionsPageContent">
          {data && !data[0] &&
            <div className="EmptyList">
              <div>
                Vous n'avez pas encore enregistré de pronostic.
              </div>
              {currentGame && currentGame._id && currentGame.teamA && currentGame.teamA &&
                <div>
                  <NavLink className="TxtBtn" routeName="game" navParams={{gameId: currentGame._id}}>
                    {'Pronostiquez dès maintenant ' + currentGame.teamA.name + '-' + currentGame.teamB.name}
                  </NavLink>
                </div>
              }
            </div>
          }
          {data && data.map((item, i) =>
            <NavLink key={i} className="Prediction" routeName="game" navParams={{gameId: item.game._id}}>
              <div className="Left">
                <div className="Group">{'Gp ' + Filters.capitalize(item.game.group)}</div>
                <div className="Stadium">{Filters.capitalize(item.game.stadium)}</div>
              </div>
              <div className="Center">
                {teamsData[item.game.teamA] &&
                  <div className="Team">
                    <div className="Label">{teamsData[item.game.teamA].name}</div>
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
                    <div className="Label">{teamsData[item.game.teamB].name}</div>
                  </div>
                }
              </div>
              <div className="Right">
                {item.channel && <div className={'chn-24 ' + item.channel}></div>}
                <div className="chn-24 bein-sports-1"></div>
              </div>
            </NavLink>
          )}
        </div>
      </div>
    );
  }
}

PredictionsTab = connectToStores(PredictionsTab, ["CurrentGameStore", "PredictionsTabStore", "TeamsDicoStore"], (context) => {
  return {
    currentGame: context.getStore("CurrentGameStore").getData(),
    data: context.getStore("PredictionsTabStore").getData(),
    teamsData: context.getStore("TeamsDicoStore").getData()
  };
}, {getStore: PropTypes.func});

export default PredictionsTab;
