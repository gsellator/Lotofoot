import React, { Component } from "react";
import PropTypes from 'prop-types';
import FormatDate from "daily-helpers/dist/FormatDate";
import Filters from "daily-filters";

import GameModalHelper from "../Helpers/GameModalHelper";
import labels from "../../labels";

if (process.env.BROWSER) {
  require("../../style/Games/GamesTab.scss");
}

class GamesTab extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  render() {
    const { days, predictions } = this.props;

    return (
      <div className="Paper GamesTab">
        <div className="TabContent">
          {days && days.map((day, i) =>
            <div key={day.datetime} className="RowContainer">
              <div className="Date">
                {Filters.capitalize(FormatDate.dtetimeToStr(day.datetime, 'LL'))}
              </div>

              {day.games && day.games.map((item, i) =>
                <div key={item.friendlyId} className={'Row ' + item.status} onClick={GameModalHelper.openGameModalFct.bind(this, item._id)}>
                  <div className="RowLine">
                    <div className="Head">
                      <div className="Rank">
                        {'#' + item.friendlyId}
                      </div>
                    </div>
                    {item.teamA &&
                      <div className="Left">
                        <div className={'flag f-12 ' + item.teamA.slug} />
                        <div className="TeamLabel">{labels[item.teamA.slug.replace('-', '')]}</div>
                      </div>
                    }
                    {!item.teamA &&
                      <div className="Left">
                        <div className="TeamLabel Alt">{labels[item.futureTeamA]}</div>
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
                        <div className={'flag f-12 ' + item.teamB.slug} />
                        <div className="TeamLabel">{labels[item.teamB.slug.replace('-', '')]}</div>
                      </div>
                    }
                    {!item.teamB &&
                      <div className="Right">
                        <div className="TeamLabel Alt">{labels[item.futureTeamB]}</div>
                      </div>
                    }

                    <div className="Head">
                      {item.channel && <div className={'icn-18 ' + item.channel} />}
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
                          <span>{labels.myPrediction + ' : ' + predictions[item._id].scoreTeamA + ' - ' + predictions[item._id].scoreTeamB}</span>
                          {item.phase != 0 && predictions[item._id].scoreTeamA == predictions[item._id].scoreTeamB &&
                            <span>
                              {predictions[item._id].winner === 'teamA' && !item.teamA && ' (' + labels[item.futureTeamA] + ')'}
                              {predictions[item._id].winner === 'teamA' && item.teamA && ' (' + labels[item.teamA.slug.replace('-', '')] + ')'}
                              {predictions[item._id].winner === 'teamB' && !item.teamB && ' (' + labels[item.futureTeamB] + ')'}
                              {predictions[item._id].winner === 'teamB' && item.teamB && ' (' + labels[item.teamB.slug.replace('-', '')] + ')'}
                            </span>
                          }
                        </div>
                      }
                      {item.status === 'TIMED' && !predictions[item._id] &&
                        <div className="PredictionLabel">
                          <span className="Desktop">{labels.clickToPredict}</span>
                          <span className="Mobile">{labels.tabToPredict}</span>
                        </div>
                      }
                      {item.status != 'TIMED' && !predictions[item._id] &&
                        <div className="PredictionLabel">
                          <span>{labels.tooLate2}</span>
                        </div>
                      }
                    </div>
                    <div className="Head">
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default GamesTab;
