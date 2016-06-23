import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import Bouncefix from 'react-bouncefix';
import Actions from "../../constants/Actions";
import { getApi } from "../../actions/Pages/ApiAction";

import BackBtn from "../Btns/BackBtn";
import RefreshBtn from "../Btns/RefreshBtn";
import HeaderBtn from "../Btns/HeaderBtn";
import AccountBtn from "../Btns/AccountBtn";

import GameBlock from "../Games/GameBlock";
import PredictionBlock from "../Predictions/PredictionBlock";
import PredictionsByGameTab from "../Predictions/PredictionsByGameTab";

if (process.env.BROWSER) {
  require("../../style/App/MainMenu.scss");
  require("../../style/Games/GameModal.scss");
}

class GameModal extends Component {
  constructor(props) {
    super(props);
    this.state = { curUrl: '' };
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const route = this.context.getStore("RouteStore").getCurrentRoute();
    this.context.executeAction(getApi, { route, view: 'Game', action: Actions.APIOK_GAME });
    this.context.executeAction(getApi, { route, view: 'PredictionsByGameAndUser', action: Actions.APIOK_PREDICTIONS_BYGAMEANDUSER });
    this.context.executeAction(getApi, { route, view: 'Teams', action: Actions.APIOK_TEAMS });
    this.context.executeAction(getApi, { route, view: 'Users', action: Actions.APIOK_USERS });
    this.context.executeAction(getApi, { route, view: 'PredictionsByGame', action: Actions.APIOK_PREDICTIONS_BYGAME });
  }

  render() {
    const route = this.context.getStore("RouteStore").getCurrentRoute();
    const { data } = this.props;

    return (
      <div className="GameModal">
        <Bouncefix className="MainMenu">
          <div className="Left">
            <BackBtn />
          </div>
        </Bouncefix>
        <Bouncefix className="ModalBody">
          <GameBlock />
          <PredictionBlock />

          {data && (data.status === 'IN_PROGRESS' || data.status === 'FINISHED') &&
            <PredictionsByGameTab />
          }
        </Bouncefix>
      </div>
    );
  }
}

GameModal = connectToStores(GameModal, ["GameBlockStore"], (context) => {
  const route = context.getStore("RouteStore").getCurrentRoute();
  const game = route.query.game;
  return {
    data: context.getStore("GameBlockStore").getData(game),
  };
}, {getStore: PropTypes.func});

export default GameModal;
