import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { navigateAction, RouteStore } from "fluxible-router";
//import FormatDate from "../Helpers/FormatDate";
//import Filters from "../Helpers/Filters";

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
    debugger;

    return (
      <div className="Paper CurrentGame">
        {data && data[0] &&
          <div>
            {false && <div className="stadium bordeaux"></div>}
            {false && <div className="stadium lens"></div>}
            {false && <div className="stadium lille"></div>}
            {false && <div className="stadium lyon"></div>}
            {false && <div className="stadium marseille"></div>}
            {false && <div className="stadium nice"></div>}
            {false && <div className="stadium paris"></div>}
            {false && <div className="stadium saint-denis"></div>}
            {false && <div className="stadium saint-etienne"></div>}
            {true && <div className="stadium toulouse"></div>}

            <div className="CurrentGameData">

              {false &&
                <div className={(data[0].winner === 'teamB' || data[0].winner === 'nobody') ? 'Team Winner' : 'Team'}>
                  <div className="Flag"><img src={data[0].teamB.flagUrl} /></div>
                  <div className="Label">{data[0].teamB.name}</div>
                </div>
              }

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
