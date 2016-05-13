import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { NavLink, navigateAction, RouteStore } from "fluxible-router";
import { setTab, setPhase } from "../../actions/Games/GamesTabAction";
import FormatDate from "../Helpers/FormatDate";
import Filters from "../Helpers/Filters";

if (process.env.BROWSER) {
  require("../../style/Games/GamesTab.scss");
}

class GamesTab extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  setTab(newTab) {
    this.context.executeAction(setTab, { newTab });
  }

  setPhase(newPhase) {
    this.context.executeAction(setPhase, { newPhase });
  }

  render() {
    const { data, phase, tab, predictions } = this.props;

    return (
      <div className="Paper GamesTab">
        {true &&
          <div className="AltPaperTitle">
            <div className="Label">
              Tous les matchs
            </div>
            <div className="icn-60 footix"></div>
          </div>
        }

        {false &&
          <div className="PhaseSelector">
            <div className={phase === '0' ? 'PhaseBtn Active' : 'PhaseBtn'} onClick={this.setPhase.bind(this, '0')}>
              <div className="PhaseLabel">Matchs</div>
            </div>
            <div className={phase === '1' ? 'PhaseBtn Active' : 'PhaseBtn'} onClick={this.setPhase.bind(this, '1')}>
              <div className="PhaseLabel">Groupes</div>
            </div>
            <div className={phase === '2' ? 'PhaseBtn Active' : 'PhaseBtn'} onClick={this.setPhase.bind(this, '2')}>
              <div className="PhaseLabel">Phase finale</div>
            </div>
          </div>
        }

        {phase === '0' &&
          <div className="GamesSelector">
            <div className={tab === '-' ? 'GamesBtn Active' : 'GamesBtn'} onClick={this.setTab.bind(this, '-')}>
              <div className="GamesLabel">Tous</div>
            </div>
            <div className={tab === 'a' ? 'GamesBtn Active' : 'GamesBtn'} onClick={this.setTab.bind(this, 'a')}>
              <div className="GamesLabel">Sem 1</div>
            </div>
            <div className={tab === 'b' ? 'GamesBtn Active' : 'GamesBtn'} onClick={this.setTab.bind(this, 'b')}>
              <div className="GamesLabel">Sem 2</div>
            </div>
            <div className={tab === 'c' ? 'GamesBtn Active' : 'GamesBtn'} onClick={this.setTab.bind(this, 'c')}>
              <div className="GamesLabel">Sem 3</div>
            </div>
            <div className={tab === 'd' ? 'GamesBtn Active' : 'GamesBtn'} onClick={this.setTab.bind(this, 'd')}>
              <div className="GamesLabel">Sem 4</div>
            </div>
          </div>
        }
        {phase === '1' &&
          <div className="GamesSelector">
            <div className={tab === '-' ? 'GamesBtn Active' : 'GamesBtn'} onClick={this.setTab.bind(this, '-')}>
              <div className="GamesLabel">Tous</div>
            </div>
            <div className={tab === 'a' ? 'GamesBtn Active' : 'GamesBtn'} onClick={this.setTab.bind(this, 'a')}>
              <div className="GamesLabel">Groupe A</div>
            </div>
            <div className={tab === 'b' ? 'GamesBtn Active' : 'GamesBtn'} onClick={this.setTab.bind(this, 'b')}>
              <div className="GamesLabel">Groupe B</div>
            </div>
            <div className={tab === 'c' ? 'GamesBtn Active' : 'GamesBtn'} onClick={this.setTab.bind(this, 'c')}>
              <div className="GamesLabel">Groupe C</div>
            </div>
            <div className={tab === 'd' ? 'GamesBtn Active' : 'GamesBtn'} onClick={this.setTab.bind(this, 'd')}>
              <div className="GamesLabel">Groupe D</div>
            </div>
            <div className={tab === 'e' ? 'GamesBtn Active' : 'GamesBtn'} onClick={this.setTab.bind(this, 'e')}>
              <div className="GamesLabel">Groupe E</div>
            </div>
            <div className={tab === 'f' ? 'GamesBtn Active' : 'GamesBtn'} onClick={this.setTab.bind(this, 'f')}>
              <div className="GamesLabel">Groupe F</div>
            </div>
          </div>
        }
        {phase === '2' &&
          <div className="GamesSelector">
            <div className={tab === '-' ? 'GamesBtn Active' : 'GamesBtn'} onClick={this.setTab.bind(this, '-')}>
              <div className="GamesLabel">Tous</div>
            </div>
            <div className={tab === 'a' ? 'GamesBtn Active' : 'GamesBtn'} onClick={this.setTab.bind(this, 'a')}>
              <div className="GamesLabel">1/8</div>
            </div>
            <div className={tab === 'b' ? 'GamesBtn Active' : 'GamesBtn'} onClick={this.setTab.bind(this, 'b')}>
              <div className="GamesLabel">1/4</div>
            </div>
            <div className={tab === 'c' ? 'GamesBtn Active' : 'GamesBtn'} onClick={this.setTab.bind(this, 'c')}>
              <div className="GamesLabel">1/2</div>
            </div>
            <div className={tab === 'd' ? 'GamesBtn Active' : 'GamesBtn'} onClick={this.setTab.bind(this, 'd')}>
              <div className="GamesLabel">Finale</div>
            </div>
          </div>
        }

        <div className="TabContent">
          {data && data.map((item, i) =>
            <div key={i}>

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
                            <div className="Pin" />
                          }
                        </div>
                        <div className="Left">
                          <div className="Flag" style={{backgroundImage: 'url(' + item.teamA.flagUrl + ')'}} />
                          <div className={(item.winner === 'teamA' || item.winner === 'nobody') ? 'TeamLabel Winner' : 'TeamLabel'}>{item.teamA.name}</div>
                        </div>
                        <div className="Center">
                          {item.status === 'TIMED' &&
                            <div className="Time">
                              {FormatDate.dtetimeToStr(item.datetime, 'HH:mm')}
                            </div>
                          }
                          {item.status === 'IN_PROGRESS' &&
                            <div className="Score">
                              <span>(&#8239;</span>
                              <span>{(item.scoreTeamA || '0')}</span>
                              <span>&#8239;-&#8239;</span>
                              <span>{(item.scoreTeamB || '0')}</span>
                              <span>&#8239;)</span>
                            </div>
                          }
                          {item.status === 'FINISHED' &&
                            <div className="Score">
                              <span>{(item.scoreTeamA || '0')}</span>
                              <span>&#8239;-&#8239;</span>
                              <span>{(item.scoreTeamB || '0')}</span>
                            </div>
                          }
                        </div>
                        <div className="Right">
                          <div className="Flag" style={{backgroundImage: 'url(' + item.teamB.flagUrl + ')'}} />
                          <div className={(item.winner === 'teamB' || item.winner === 'nobody') ? 'TeamLabel Winner' : 'TeamLabel'}>{item.teamB.name}</div>
                        </div>

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
                              <span className="icn-16 chip" />
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
    );
  }
}

GamesTab = connectToStores(GamesTab, ["GamesTabStore", "PredictionsDicoStore"], (context) => {
  return {
    data: context.getStore("GamesTabStore").getData(),
    tab: context.getStore("GamesTabStore").getTab(),
    phase: context.getStore("GamesTabStore").getPhase(),
    predictions: context.getStore("PredictionsDicoStore").getData(),
  };
}, {getStore: PropTypes.func});

export default GamesTab;
