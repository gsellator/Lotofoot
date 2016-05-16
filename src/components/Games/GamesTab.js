import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { NavLink, navigateAction, RouteStore } from "fluxible-router";
import { setSubfilter, setFilter } from "../../actions/Games/GamesTabAction";
import FormatDate from "../Helpers/FormatDate";
import Filters from "../Helpers/Filters";
import Labels from "../../constants/Labels";

if (process.env.BROWSER) {
  require("../../style/Games/GamesTab.scss");
}

class GamesTab extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  setFilter(newFilter) {
    this.context.executeAction(setFilter, { newFilter });
  }
  
  setSubfilter(newSubfilter) {
    this.context.executeAction(setSubfilter, { newSubfilter });
  }

  render() {
    const { games, filter, subfilter, predictions } = this.props;

    return (
      <div>
        <div className="Paper GamesFilters">
          <div className="FilterSelector">
            <div className={filter === 'match' ? 'FilterBtn Active' : 'FilterBtn'} onClick={this.setFilter.bind(this, 'match')}>
              <div className="FilterLabel">Matchs</div>
            </div>
            <div className={filter === 'group' ? 'FilterBtn Active' : 'FilterBtn'} onClick={this.setFilter.bind(this, 'group')}>
              <div className="FilterLabel">Groupes</div>
            </div>
            <div className={filter === 'finale' ? 'FilterBtn Active' : 'FilterBtn'} onClick={this.setFilter.bind(this, 'finale')}>
              <div className="FilterLabel">Phase finale</div>
            </div>
          </div>

          {filter === 'match' &&
            <div className="SubfilterSelector">
              <div className={subfilter === '-' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, '-')}>
                <div className="SubfilterLabel">Tous</div>
              </div>
              <div className={subfilter === '1' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, '1')}>
                <div className="SubfilterLabel">À venir</div>
              </div>
              <div className={subfilter === '2' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, '2')}>
                <div className="SubfilterLabel">À pronostiquer</div>
              </div>
            </div>
          }
          {filter === 'group' &&
            <div className="SubfilterSelector">
              <div className={subfilter === '-' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, '-')}>
                <div className="SubfilterLabel">Tous</div>
              </div>
              <div className={subfilter === 'a' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, 'a')}>
                <div className="SubfilterLabel">Groupe A</div>
              </div>
              <div className={subfilter === 'b' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, 'b')}>
                <div className="SubfilterLabel">Groupe B</div>
              </div>
              <div className={subfilter === 'c' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, 'c')}>
                <div className="SubfilterLabel">Groupe C</div>
              </div>
              <div className={subfilter === 'd' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, 'd')}>
                <div className="SubfilterLabel">Groupe D</div>
              </div>
              <div className={subfilter === 'e' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, 'e')}>
                <div className="SubfilterLabel">Groupe E</div>
              </div>
              <div className={subfilter === 'f' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, 'f')}>
                <div className="SubfilterLabel">Groupe F</div>
              </div>
            </div>
          }
          {filter === 'finale' &&
            <div className="SubfilterSelector">
              <div className={subfilter === '-' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, '-')}>
                <div className="SubfilterLabel">Tous</div>
              </div>
              <div className={subfilter === '1' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, '1')}>
                <div className="SubfilterLabel">1/8</div>
              </div>
              <div className={subfilter === '2' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, '2')}>
                <div className="SubfilterLabel">1/4</div>
              </div>
              <div className={subfilter === '3' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, '3')}>
                <div className="SubfilterLabel">1/2</div>
              </div>
              <div className={subfilter === '4' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, '4')}>
                <div className="SubfilterLabel">Finale</div>
              </div>
            </div>
          }
        </div>


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
                      <NavLink className="Row" routeName="game" navParams={{gameId: item._id}}>
                        <div className="RowLine">
                          <div className="Head">
                            {item.status === 'TIMED' && !predictions[item._id] &&
                              <div className={item.teamA ? 'Pin' : 'Pin Alt'} />
                            }
                            {(item.status != 'TIMED' || predictions[item._id]) &&
                              <div className="Pin Trsp" />
                            }
                            <div className="Rank">
                              {'#' + item.friendlyId}
                            </div>
                          </div>
                          {item.teamA &&
                            <div className="Left">
                              <div className={'flag-12 ' + item.teamA.slug} />
                              <div className={(item.winner === 'teamA' || item.winner === 'nobody') ? 'TeamLabel Winner' : 'TeamLabel'}>{item.teamA.name}</div>
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
                              <div className={(item.winner === 'teamB' || item.winner === 'nobody') ? 'TeamLabel Winner' : 'TeamLabel'}>{item.teamB.name}</div>
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
                          <div className="Left">
                            {item.status === 'TIMED' && predictions[item._id] &&
                              <div className="PredictionLabel">
                                <span className="icn-16 chip" />
                                <span>{'Mon pronostic : ' + predictions[item._id].scoreTeamA + ' - ' + predictions[item._id].scoreTeamB}</span>
                              </div>
                            }
                            {item.status === 'TIMED' && !predictions[item._id] &&
                              <div className="PredictionLabel">
                                {false && <span className="icn-16 chip" />}
                                <span>Pas encore de pronostic</span>
                              </div>
                            }
                          </div>
                        </div>
                      </NavLink>
                    )
                })()}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

GamesTab = connectToStores(GamesTab, ["GamesTabStore"], (context) => {
  return {
    games: context.getStore("GamesTabStore").getGames(),
    predictions: context.getStore("GamesTabStore").getPredictions(),
    filter: context.getStore("GamesTabStore").getFilter(),
    subfilter: context.getStore("GamesTabStore").getSubfilter(),
  };
}, {getStore: PropTypes.func});

export default GamesTab;
