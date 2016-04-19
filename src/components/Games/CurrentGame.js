import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { navigateAction, RouteStore } from "fluxible-router";
import FormatDate from "../Helpers/FormatDate";
import Filters from "../Helpers/Filters";

if (process.env.BROWSER) {
  require("../../style/Games/CurrentGame.scss");
}

class CurrentGame extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  render() {
    const { data } = this.props;

    return (
      <div className="Paper CurrentGame">
        {data && data[0] &&
          <div>
            <div className={'Stadium ' + data[0].stadium.toLowerCase()}></div>
            
            <div className="CurrentGameData">
              {data[0].phase === 0 && <div className="Phase">{'Groupe ' + Filters.capitalize(data[0].group)}</div>}
              {data[0].phase === 1 && <div className="Phase">Huitième de finale</div>}
              {data[0].phase === 2 && <div className="Phase">Quart de finale</div>}
              {data[0].phase === 3 && <div className="Phase">Demi finale</div>}
              {data[0].phase === 4 && <div className="Phase">Finale</div>}
              
              <div className="TeamBlock">
                <div className={(data[0].winner === 'teamA' || data[0].winner === 'nobody') ? 'Team Winner' : 'Team'}>
                  <div className="Flag"><img src={data[0].teamA.flagUrl} /></div>
                  <div className="Label">{data[0].teamA.name}</div>
                </div>
                <div className="ScoreContainer">
                  {!data[0].scoreTeamA && false && 'test'}
                  {data[0].status === 'TIMED' &&
                    <div className="Score">
                      <span>{FormatDate.dtetimeToStr(data[0].datetime, 'HH:mm')}</span>
                    </div>
                  }
                  {data[0].scoreTeamA && false && 'test'}
                  {data[0].status === 'IN_PROGRESS' &&
                    <div>
                      <div className="Score">
                        <span>{'(' + (data[0].scoreTeamA || '0')}</span>
                        <span>&#8239;-&#8239;</span>
                        <span>{(data[0].scoreTeamB || '0') + ')'}</span>
                      </div>
                      {false &&
                        <div className="Time">
                          27:01
                        </div>
                      }
                    </div>
                  }
                  {data[0].status === 'FINISHED' &&
                    <div>
                      <div className="Score">
                        <span>{'(' + (data[0].scoreTeamA || '0')}</span>
                        <span>&#8239;-&#8239;</span>
                        <span>{(data[0].scoreTeamB || '0') + ')'}</span>
                      </div>
                    </div>
                  }
                </div>
                <div className={(data[0].winner === 'teamB' || data[0].winner === 'nobody') ? 'Team Winner' : 'Team'}>
                  <div className="Flag"><img src={data[0].teamB.flagUrl} /></div>
                  <div className="Label">{data[0].teamB.name}</div>
                </div>
              </div>

            </div>
                  
            <div className="MetaData">
              <div className="Left">
                <div className="icn-16 pin"></div>
                <div className="Label">{data[0].stadium}</div>
              </div>
              <div className="Right">
                {data[0].channel && <div className={'chn-ico alt ' + data[0].channel}></div>}
                <div className="chn-ico alt bein-sports-1"></div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

CurrentGame = connectToStores(CurrentGame, ["CurrentGameStore"], (context) => {
  return {
    data: context.getStore("CurrentGameStore").getData(),
  };
}, {getStore: PropTypes.func});

export default CurrentGame;
