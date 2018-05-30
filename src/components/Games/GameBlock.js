import React, { Component } from "react";
import FormatDate from "daily-helpers/dist/FormatDate";
import Filters from "daily-filters";

import labels from "../../labels";

if (process.env.BROWSER) {
  require("../../style/Games/GameBlock.scss");
}


class GameBlock extends Component {
  render() {
    const { data } = this.props;

    return (
      <div className="Paper GameBlock">
        {!data && <div className="FootixLoader" />}
        {data &&
          <div>
            <div className={data.stadium ? 'Stadium ' + data.stadium.toLowerCase().replace('é', 'e') : 'Stadium'}></div>

            <div className="GameBlockData">
              {data.status === 'TIMED' &&
                <div className="Date">
                  {Filters.toTitleCase(FormatDate.dtetimeToStr(data.datetime, labels.dateFormatGameBlock)) + ' - ' + labels.game + ' ' + data.friendlyId}
                </div>
              }
              {data.status === 'IN_PROGRESS' &&
                <div className="Date">
                  {labels.game + ' ' + data.friendlyId + ' - ' + labels.inProgress}
                </div>
              }
              {data.status === 'FINISHED' &&
                <div className="Date">
                  {labels.game + ' ' + data.friendlyId + ' - ' + labels.finished}
                </div>
              }

              {data.phase === 0 && <div className="Phase">{labels.group + ' ' + Filters.capitalize(data.group)}</div>}
              {data.phase === 1 && <div className="Phase">{labels.eightFinal}</div>}
              {data.phase === 2 && <div className="Phase">{labels.quarterFinal}</div>}
              {data.phase === 3 && <div className="Phase">{labels.semiFinal}</div>}
              {data.phase === 4 && <div className="Phase">{labels.Final}</div>}

              <div className="TeamBlock">
                {!data.teamA &&
                  <div className="Team">
                    <div className="Flag">
                      <div className="flag f-60" />
                    </div>
                    <div className="Label">{labels[data.futureTeamA]}</div>
                  </div>
                }
                {data.teamA &&
                  <div className="Team">
                    <div className="Flag">
                      <div className={'flag f-60 ' + data.teamA.slug} />
                    </div>
                    <div className="Label">{labels[data.teamA.slug.replace('-', '')]}</div>
                  </div>
                }
                <div className="ScoreContainer">
                  {data.status === 'TIMED' &&
                    <div className="Score">
                      <span>{FormatDate.dtetimeToStr(data.datetime, 'HH:mm')}</span>
                    </div>
                  }
                  {data.status === 'IN_PROGRESS' &&
                    <div>
                      <div className="Score">
                        <span>{'(' + (data.scoreTeamA || '0')}</span>
                        <span>&#8239;-&#8239;</span>
                        <span>{(data.scoreTeamB || '0') + ')'}</span>
                      </div>
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
                  <div className="Team">
                    <div className="Flag">
                      <div className={'flag f-60 ' + data.teamB.slug} />
                    </div>
                    <div className="Label">{labels[data.teamB.slug.replace('-', '')]}</div>
                  </div>
                }
                {!data.teamB &&
                  <div className="Team">
                    <div className="Flag">
                      <div className="flag f-60" />
                    </div>
                    <div className="Label">{labels[data.futureTeamB]}</div>
                  </div>
                }
              </div>

            </div>

            <div className="MetaData">
              <div className="Left">
                <div className="icn-16 pin"></div>
                <div className="Label">{labels[data.stadium]}</div>
              </div>
              <div className="Right">
                {data.channel && <div className={'icn-24 ' + data.channel}></div>}
                <div className="icn-24 bein-sports-1"></div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default GameBlock;
