import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { navigateAction, RouteStore } from "fluxible-router";
import FormatDate from "../Helpers/FormatDate";
import Filters from "../Helpers/Filters";

if (process.env.BROWSER) {
  require("../../style/Games/GameBlock.scss");
}


class GameBlock extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  render() {
    const { data } = this.props;

    return (
      <div className="Paper GameBlock">
        {data &&
          <div>
            <div className={'Stadium ' + data.stadium.toLowerCase()}></div>

            <div className="GameBlockData">
              {data.status === 'TIMED' &&
                <div className="Date">
                  {Filters.capitalize(FormatDate.dtetimeToStr(data.datetime, 'dddd DD MMMM')) + ' - Match ' + data.friendlyId}
                </div>
              }
              {data.status === 'IN_PROGRESS' &&
                <div className="Date">
                  {'Match ' + data.friendlyId + ' - En cours'}
                </div>
              }
              {data.status === 'FINISHED' &&
                <div className="Date">
                  {'Match ' + data.friendlyId + ' - Terminé'}
                </div>
              }
              
              {data.phase === 0 && <div className="Phase">{'Groupe ' + Filters.capitalize(data.group)}</div>}
              {data.phase === 1 && <div className="Phase">Huitième de finale</div>}
              {data.phase === 2 && <div className="Phase">Quart de finale</div>}
              {data.phase === 3 && <div className="Phase">Demi finale</div>}
              {data.phase === 4 && <div className="Phase">Finale</div>}

              <div className="TeamBlock">
                <div className={(data.winner === 'teamA' || data.winner === 'nobody') ? 'Team Winner' : 'Team'}>
                  <div className="Flag"><img src={data.teamA.flagUrl} /></div>
                  <div className="Label">{data.teamA.name}</div>
                </div>
                <div className="ScoreContainer">
                  {!data.scoreTeamA && false && 'test'}
                  {data.status === 'TIMED' &&
                    <div className="Score">
                      <span>{FormatDate.dtetimeToStr(data.datetime, 'HH:mm')}</span>
                    </div>
                  }
                  {data.scoreTeamA && false && 'test'}
                  {data.status === 'IN_PROGRESS' &&
                    <div>
                      <div className="Score">
                        <span>{'(' + (data.scoreTeamA || '0')}</span>
                        <span>&#8239;-&#8239;</span>
                        <span>{(data.scoreTeamB || '0') + ')'}</span>
                      </div>
                      {false &&
                        <div className="Time">
                          27:01
                        </div>
                      }
                    </div>
                  }
                  {data.status === 'FINISHED' &&
                    <div>
                      <div className="Score">
                        <span>{(data.scoreTeamA || '0')}</span>
                        <span>&#8239;-&#8239;</span>
                        <span>{(data.scoreTeamB || '0')}</span>
                      </div>
                    </div>
                  }
                </div>
                <div className={(data.winner === 'teamB' || data.winner === 'nobody') ? 'Team Winner' : 'Team'}>
                  <div className="Flag"><img src={data.teamB.flagUrl} /></div>
                  <div className="Label">{data.teamB.name}</div>
                </div>
              </div>

            </div>

            <div className="MetaData">
              <div className="Left">
                <div className="icn-16 pin"></div>
                <div className="Label">{data.stadium}</div>
              </div>
              <div className="Right">
                {data.channel && <div className={'chn-ico alt ' + data.channel}></div>}
                <div className="chn-ico alt bein-sports-1"></div>
              </div>
            </div>
          </div>
        }

        {false &&
          <div>
            <div>data.friendlyId : {data.friendlyId}</div>
            <div>data.datetime : {data.datetime}</div>
            <div>data.status : {data.status}</div>
            <div>data.createdAt : {data.createdAt}</div>
            <div>data.updatedAt : {data.updatedAt}</div>
            <div>data.teamA._id : {data.teamA._id}</div>
            <div>data.teamA.slug : {data.teamA.slug}</div>
            <div>data.teamB._id : {data.teamB._id}</div>
            <div>data.teamB.slug : {data.teamB.slug}</div>
          </div>
        }
      </div>
    );
  }
}

GameBlock = connectToStores(GameBlock, ["GameBlockStore"], (context) => {
  return {
    data: context.getStore("GameBlockStore").getData()
  };
}, {getStore: PropTypes.func});

export default GameBlock;
