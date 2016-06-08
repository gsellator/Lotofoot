import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import Labels from "../../Labels";

if (process.env.BROWSER) {
  require("../../style/Games/GroupRanking.scss");
}

class GroupRanking extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  render() {
    const { data } = this.props;

    return (
      <div className={(data && data[0]) ? 'Paper GroupRanking' : ''}>
        {data && data[0] &&
          <div>
            <div className="AltPaperTitle">
              <div className="Label">
                Classement selon vous
              </div>
              <div className="icn-60 footix"></div>
            </div>
            <div className="Table">
              <div className="Row">
                <div>Rang</div>
                <div>Pays</div>
                <div>Pts</div>
                <div>Dif</div>
              </div>
              {data && data.map((item, i) =>
                <div key={i} className="Row">
                  <div>
                    <span>{'#' + (i+1)}</span>
                  </div>
                  <div>
                    <span className={'flag-12 ' + item.slug} />
                    <span>{Labels[item.slug.replace('-', '')]}</span>
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

GroupRanking = connectToStores(GroupRanking, ["GamesTabStore"], (context) => {
  return {
    data: context.getStore("GamesTabStore").getGroupRanking(),
  };
}, {getStore: PropTypes.func});

export default GroupRanking;
