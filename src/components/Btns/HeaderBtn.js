import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { navigateAction } from "fluxible-router";
import FormatDate from "../Helpers/FormatDate";
import Labels from "../../constants/Labels";
import config from "../../config";

if (process.env.BROWSER) {
  require("../../style/Btns/HeaderBtn.scss");
}

class HeaderBtn extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  reload(){
    const newroute = this.context.getStore("RouteStore").makePath('home');
    this.context.executeAction(navigateAction, { url: newroute });
  }

  render() {
    const route = this.context.getStore('RouteStore').getCurrentRoute();
    const routeName = route.getIn(["name"]);
    const { data } = this.props;

    return (
      <div className="HeaderBtn" onTouchTap={this.reload.bind(this)} title={Labels.home}>
        {(routeName === 'home' || !data) &&
          <div className={'icn-20 title ' + config.appName}></div>
        }
        {(routeName != 'home' && data && data.status === 'TIMED') &&
          <div className="Live">
            <div className="icn-10 next"></div>

            <div className="Cartouche">
              <span className="Flag">
                <img src={data.teamA && data.teamA.flagUrl} />
              </span>
              <span className="Score">{FormatDate.dtetimeToStr(data.datetime, 'HH:mm')}</span>
              <span className="Flag">
                <img src={data.teamB && data.teamB.flagUrl} />
              </span>
            </div>
          </div>
        }
        {(routeName != 'home' && data && data.status === 'IN_PROGRESS') &&
          <div className="Live">
            <div className="icn-10 live"></div>

            <div className="Cartouche">
              <span className="Flag">
                <img src={data.teamA && data.teamA.flagUrl} />
              </span>
              <span className="Score">
                {data.scoreTeamA || '0'}
              </span>
              <span className="Score">&#8239;-&#8239;</span>
              <span className="Score">
                {data.scoreTeamB || '0'}
              </span>
              <span className="Flag">
                <img src={data.teamB && data.teamB.flagUrl} />
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
