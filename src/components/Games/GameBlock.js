import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { NavLink, navigateAction, RouteStore } from "fluxible-router";
import FormatDate from "../Helpers/FormatDate";
import Filters from "../Helpers/Filters";
import Labels from "../../Labels";

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
          <NavLink routeName="game" navParams={{gameId: data._id}}>
            <div className={'Stadium ' + data.stadium.toLowerCase()}></div>

            <div className="GameBlockData">
              {data.status === 'TIMED' &&
                <div className="Date">
                  {Filters.capitalize(FormatDate.dtetimeToStr(data.datetime, 'dddd DD MMMM')) + ' - ' + Labels.game + ' ' + data.friendlyId}
                </div>
              }
              {data.status === 'IN_PROGRESS' &&
                <div className="Date">
                  {Labels.game + ' ' + data.friendlyId + ' - ' + Labels.finished}
                </div>
              }
              {data.status === 'FINISHED' &&
                <div className="Date">
                  {Labels.game + ' ' + data.friendlyId + ' -' + Labels.inProgress}
                </div>
              }

              {data.phase === 0 && <div className="Phase">{Labels.group + ' ' + Filters.capitalize(data.group)}</div>}
              {data.phase === 1 && <div className="Phase">{Labels.eightFinal}</div>}
              {data.phase === 2 && <div className="Phase">{Labels.quarterFinal}</div>}
              {data.phase === 3 && <div className="Phase">{Labels.semiFinal}</div>}
              {data.phase === 4 && <div className="Phase">{Labels.Final}</div>}

              <div className="TeamBlock">
                {data.teamA &&
                  <div className={(data.winner === 'teamA' || data.winner === 'nobody') ? 'Team Winner' : 'Team'}>
                    <div className="Flag">
                      <div className={'flag-60 ' + data.teamA.slug} />
                    </div>
                    <div className="Label">{Labels[data.teamA.slug.replace('-', '')]}</div>
                  </div>
                }
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
                {data.teamB &&
                  <div className={(data.winner === 'teamB' || data.winner === 'nobody') ? 'Team Winner' : 'Team'}>
                    <div className="Flag">
                      <div className={'flag-60 ' + data.teamB.slug} />
                    </div>
                    <div className="Label">{Labels[data.teamB.slug.replace('-', '')]}</div>
                  </div>
                }
              </div>

            </div>

            <div className="MetaData">
              <div className="Left">
                <div className="icn-16 pin"></div>
                <div className="Label">{data.stadium}</div>
              </div>
              <div className="Right">
                {data.channel && <div className={'chn-24 ' + data.channel}></div>}
                <div className="chn-24 bein-sports-1"></div>
              </div>
            </div>
          </NavLink>
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
