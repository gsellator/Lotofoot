import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { navigateAction, RouteStore } from "fluxible-router";
import { setTab } from "../../actions/Games/GamesTabAction";
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

  render() {
    const { data, tab } = this.props;

    return (
      <div className="Paper GamesTab">
        <div className="AltPaperTitle">
          <div className="Label">
            Tous les matchs
          </div>
          <div className="icn-60 footix"></div>
        </div>

        <div className="GamesMenu">
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
                      {Filters.capitalize(FormatDate.toStr(item.date, 'dddd DD MMMM'))}
                    </div>
                  )
                else
                  return (
                    <div className="Match">
                      <div className="Left">
                        <div className="Group">{'Gp ' + Filters.capitalize(item.group)}</div>
                        <div className="Stadium">{Filters.capitalize(item.stadium)}</div>
                      </div>
                      <div className="Center">
                        <div className="Team">
                          <div className="Label">{item.teamA.name}</div>
                          <div className="Flag"><img src={item.teamA.flagUrl} /></div>
                        </div>
                        <div className="Score">
                          {FormatDate.dtetimeToStr(item.datetime, 'HH:mm')}
                        </div>
                        <div className="Team">
                          <div className="Flag"><img src={item.teamB.flagUrl} /></div>
                          <div className="Label">{item.teamB.name}</div>
                        </div>
                      </div>
                      <div className="Right">
                        {item.channel && <div className={'chn-ico alt ' + item.channel}></div>}
                        <div className="chn-ico alt bein-sports-1"></div>
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
    data: context.getStore("GamesTabStore").getData(),
    tab: context.getStore("GamesTabStore").getTab(),
  };
}, {getStore: PropTypes.func});

export default GamesTab;
