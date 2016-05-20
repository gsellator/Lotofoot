import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { navigateAction } from "fluxible-router";
import FormatDate from "../Helpers/FormatDate";
import Labels from "../../Labels";
import GameModalHelper from "../../components/Helpers/GameModalHelper";

if (process.env.BROWSER) {
  require("../../style/Btns/HeaderBtn.scss");
}

class HeaderBtn extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  render() {
    const route = this.context.getStore('RouteStore').getCurrentRoute();
    const routeName = route.name;
    const { data } = this.props;

    return (
      <div className="HeaderBtn">
        {(!data || (data && data.status === 'FINISHED')) &&
          <div className="icn-20 title"></div>
        }
        {data && data.status === 'TIMED' &&
          <div className="Live" onTouchTap={GameModalHelper.openGameModalFct.bind(this, data._id)}>
            <div className="icn-10 next"></div>

            <div className="Cartouche">
              <span className="Flag">
                {data.teamA && <div className={'flag-12 ' + data.teamA.slug} title={Labels[data.teamA.slug.replace('-', '')]} />}
              </span>
              {FormatDate.isToday(data.datetime) &&
                <span className="Score">{FormatDate.dtetimeToStr(data.datetime, 'HH:mm')}</span>
              }
              {!FormatDate.isToday(data.datetime) &&
                <span>
                  <span className="Score">{FormatDate.dtetimeToStr(data.datetime, 'DD')}</span>
                  <span className="Score">&#8239;/&#8239;</span>
                  <span className="Score">{FormatDate.dtetimeToStr(data.datetime, 'MM')}</span>
                </span>
              }
              <span className="Flag">
                {data.teamB && <div className={'flag-12 ' + data.teamB.slug} title={Labels[data.teamB.slug.replace('-', '')]} />}
              </span>
            </div>
          </div>
        }
        {data && data.status === 'IN_PROGRESS' &&
          <div className="Live" onTouchTap={GameModalHelper.openGameModalFct.bind(this, data._id)}>
            <div className="icn-10 live"></div>

            <div className="Cartouche">
              <span className="Flag">
                {data.teamA && <div className={'flag-12 ' + data.teamA.slug} title={Labels[data.teamA.slug.replace('-', '')]} />}
              </span>
              <span className="Score">
                {data.scoreTeamA || '0'}
              </span>
              <span className="Score">&#8239;-&#8239;</span>
              <span className="Score">
                {data.scoreTeamB || '0'}
              </span>
              <span className="Flag">
                {data.teamB && <div className={'flag-12 ' + data.teamB.slug} title={Labels[data.teamB.slug.replace('-', '')]} />}
              </span>
            </div>
          </div>
        }
      </div>
    );
  }
}

HeaderBtn = connectToStores(HeaderBtn, ["CurrentGameStore"], (context) => {
  return {
    data: context.getStore("CurrentGameStore").getData()
  };
}, {getStore: PropTypes.func});

export default HeaderBtn;
