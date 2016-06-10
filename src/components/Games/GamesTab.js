import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { NavLink } from "fluxible-router";
import GameModalHelper from "../Helpers/GameModalHelper";
import FormatDate from "../Helpers/FormatDate";
import Filters from "../Helpers/Filters";
import Labels from "../../Labels";

if (process.env.BROWSER) {
  require("../../style/Games/GamesTab.scss");
}

class GamesTab extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  render() {
    const { games, predictions } = this.props;

    return (
      <div className="Paper GamesTab">
        <div className="TabContent">
          {games && games.map((item, i) =>
            <div key={i} className="RowContainer">

              {(() => {
                if (item.isHeader)
                  return (
                    <div className="Date">
                      {Filters.capitalize(FormatDate.dtetimeToStr(item.datetime, 'dddd DD MMMM'))}
                    </div>
                  )
                else
                  return (
                    <div className="Row" onTouchTap={GameModalHelper.openGameModalFct.bind(this, item._id)}>
                      <div className="RowLine">
                        <div className="Head">
                          <div className="Rank">
                            {'#' + item.friendlyId}
                          </div>
                        </div>
                        {item.teamA &&
                          <div className="Left">
                            <div className={'flag-12 ' + item.teamA.slug} />
                            <div className={(item.winner === 'teamA' || item.winner === 'nobody') ? 'TeamLabel Winner' : 'TeamLabel'}>{Labels[item.teamA.slug.replace('-', '')]}</div>
                          </div>
                        }
                        {!item.teamA &&
                          <div className="Left">
                            <div className="TeamLabel Alt">{Labels[item.futureTeamA]}</div>
                          </div>
                        }
                        <div className="Center">
                          {item.status === 'TIMED' &&
                            <div className="Time">
                              {FormatDate.dtetimeToStr(item.datetime, 'HH:mm')}
                            </div>
                          }
                          {item.status === 'IN_PROGRESS' && item.teamA && item.teamB &&
                            <div className="Score">
                              <span>(&#8239;</span>
                              <span>{(item.scoreTeamA || '0')}</span>
                              <span>&#8239;-&#8239;</span>
                              <span>{(item.scoreTeamB || '0')}</span>
                              <span>&#8239;)</span>
                            </div>
                          }
                          {item.status === 'FINISHED' && item.teamA && item.teamB &&
                            <div className="Score">
                              <span>{(item.scoreTeamA || '0')}</span>
                              <span>&#8239;-&#8239;</span>
                              <span>{(item.scoreTeamB || '0')}</span>
                            </div>
                          }
                        </div>
                        {item.teamB &&
                          <div className="Right">
                            <div className={'flag-12 ' + item.teamB.slug} />
                            <div className={(item.winner === 'teamB' || item.winner === 'nobody') ? 'TeamLabel Winner' : 'TeamLabel'}>{Labels[item.teamB.slug.replace('-', '')]}</div>
                          </div>
                        }
                        {!item.teamB &&
                          <div className="Right">
                            <div className="TeamLabel Alt">{Labels[item.futureTeamB]}</div>
                          </div>
                        }

                        <div className="Head">
                          {item.channel && <div className={'chn-18 ' + item.channel} />}
                        </div>
                      </div>

                      <div className="RowSubLine">
                        <div className="Head">
                          {item.status === 'TIMED' && !predictions[item._id] &&
                            <div className={item.teamA ? 'Pin' : 'Pin Alt'} />
                          }
                          {(item.status != 'TIMED' || predictions[item._id]) &&
                            <div className="Pin Trsp" />
                          }
                        </div>
                        <div className="Left">
                          {predictions[item._id] &&
                            <div className="PredictionLabel">
                              <span className="icn-16 chip" />
                              <span>{'Mon pronostic : ' + predictions[item._id].scoreTeamA + ' - ' + predictions[item._id].scoreTeamB}</span>
                            </div>
                          }
                          {item.status === 'TIMED' && !predictions[item._id] &&
                            <div className="PredictionLabel">
                              <span className="Desktop">{Labels.clickToPredict}</span>
                              <span className="Mobile">{Labels.tabToPredict}</span>
                            </div>
                          }
                          {item.status != 'TIMED' && !predictions[item._id] &&
                            <div className="PredictionLabel">
                              <span>{Labels.tooLate2}</span>
                            </div>
                          }
                        </div>
                        <div className="Head">
                        </div>
                      </div>
                    </div>
                  )
              })()}
            </div>
          )}
        </div>
      </div>
    );
  }
}

GamesTab = connectToStores(GamesTab, ["GamesTabStore"], (context) => {
  return {
    games: context.getStore("GamesTabStore").getGames(),
    predictions: context.getStore("GamesTabStore").getPredictions(),
  };
}, {getStore: PropTypes.func});

export default GamesTab;
