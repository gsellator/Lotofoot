import React, { Component } from "react";

import labels from "../../labels";

if (process.env.BROWSER) {
  require("../../style/Games/GroupRanking.scss");
}

class GroupRanking extends Component {
  render() {
    const { data } = this.props;

    return (
      <div className={(data && data[0]) ? 'Paper GroupRanking' : ''}>
        {data && data[0] &&
          <div>
            <div className="PaperTitle">
              {labels.yourRanking}
            </div>
            <div className="Table">
              <div className="Row">
                <div>{labels.rank}</div>
                <div>{labels.country}</div>
                <div>{labels.rankingPoints}</div>
                <div>{labels.goalDifference}</div>
              </div>
              {data && data.map((item, i) =>
                <div key={i} className="Row">
                  <div>
                    <span>{'#' + (i+1)}</span>
                  </div>
                  <div>
                    <span className={'flag f-12 ' + item.slug} />
                    <span>{labels[item.slug.replace('-', '')]}</span>
                  </div>
                  <div>{item.points}</div>
                  <div>{item.dif}</div>
                </div>
              )}
            </div>
          </div>
        }
      </div>
    );
  }
}

export default GroupRanking;