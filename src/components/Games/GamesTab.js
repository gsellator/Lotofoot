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
    const { data, phase, tab } = this.props;

    return (
      <div className="Paper GamesTab">
        <div className="AltPaperTitle">
          <div className="Label">
            Tous les matchs
          </div>
          <div className="icn-60 footix"></div>
        </div>

        {false &&
          <div className="GamesMenu">
            <div className={phase === '0' ? 'MenuItem Active' : 'MenuItem'} onClick={this.setPhase.bind(this, '0')}>
              <div className="Label">Poules</div>
            </div>
            <div className={phase === '1' ? 'MenuItem Active' : 'MenuItem'} onClick={this.setPhase.bind(this, '1')}>
              <div className="Label">Huitièmes</div>
            </div>
            <div className={phase === '2' ? 'MenuItem Active' : 'MenuItem'} onClick={this.setPhase.bind(this, '2')}>
              <div className="Label">Quarts</div>
            </div>
            <div className={phase === '3' ? 'MenuItem Active' : 'MenuItem'} onClick={this.setPhase.bind(this, '3')}>
              <div className="Label">Demis</div>
            </div>
            <div className={phase === '4' ? 'MenuItem Active' : 'MenuItem'} onClick={this.setPhase.bind(this, '4')}>
              <div className="Label">Finale</div>
            </div>
          </div>
        }

        <div className="GamesMenu Sub">
          <div className={tab === '-' ? 'MenuItem Active' : 'MenuItem'} onClick={this.setTab.bind(this, '-')}>
            <div className="Label">Tous</div>
          </div>
          <div className={tab === 'a' ? 'MenuItem Active' : 'MenuItem'} onClick={this.setTab.bind(this, 'a')}>
            <div className="Label">Groupe A</div>
          </div>
          <div className={tab === 'b' ? 'MenuItem Active' : 'MenuItem'} onClick={this.setTab.bind(this, 'b')}>
            <div className="Label">Groupe B</div>
          </div>
          <div className={tab === 'c' ? 'MenuItem Active' : 'MenuItem'} onClick={this.setTab.bind(this, 'c')}>
            <div className="Label">Groupe C</div>
          </div>
          <div className={tab === 'd' ? 'MenuItem Active' : 'MenuItem'} onClick={this.setTab.bind(this, 'd')}>
            <div className="Label">Groupe D</div>
          </div>
          <div className={tab === 'e' ? 'MenuItem Active' : 'MenuItem'} onClick={this.setTab.bind(this, 'e')}>
            <div className="Label">Groupe E</div>
          </div>
          <div className={tab === 'f' ? 'MenuItem Active' : 'MenuItem'} onClick={this.setTab.bind(this, 'f')}>
            <div className="Label">Groupe F</div>
          </div>
        </div>

        <div>
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
                    <NavLink className="Match" routeName="game" navParams={{gameId: item._id}}>
                      <div className="Left">
                        <div className="Group">{'Gp ' + Filters.capitalize(item.group)}</div>
                        <div className="Stadium">{Filters.capitalize(item.stadium)}</div>
                      </div>
                      <div className="Center">
                        <div className={(item.winner === 'teamA' || item.winner === 'nobody') ? 'Team Winner' : 'Team'}>
                          <div className="Label">{item.teamA.name}</div>
                          <div className="Flag"><img src={item.teamA.flagUrl} /></div>
                        </div>
                        <div className="ScoreContainer">
                          {!(item.scoreTeamA || item.scoreTeamB) &&
                            <span className="Time">{FormatDate.dtetimeToStr(item.datetime, 'HH:mm')}</span>
                          }
                          {(item.scoreTeamA || item.scoreTeamB) &&
                            <span className="Score">
                              {item.status === 'IN_PROGRESS' && <span>(</span> }
                              <span>{(item.scoreTeamA || '0')}</span>
                              <span>&#8239;-&#8239;</span>
                              <span>{(item.scoreTeamB || '0')}</span>
                              {item.status === 'IN_PROGRESS' && <span>)</span> }
                            </span>
                          }
                        </div>
                        <div className={(item.winner === 'teamB' || item.winner === 'nobody') ? 'Team Winner' : 'Team'}>
                          <div className="Flag"><img src={item.teamB.flagUrl} /></div>
                          <div className="Label">{item.teamB.name}</div>
                        </div>
                      </div>
                      <div className="Right">
                        {item.channel && <div className={'chn-ico alt ' + item.channel}></div>}
                        <div className="chn-ico alt bein-sports-1"></div>
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

GamesTab = connectToStores(GamesTab, ["GamesTabStore"], (context) => {
  return {
    data: context.getStore("GamesTabStore").getData(),
    tab: context.getStore("GamesTabStore").getTab(),
    phase: context.getStore("GamesTabStore").getPhase(),
  };
}, {getStore: PropTypes.func});

export default GamesTab;
