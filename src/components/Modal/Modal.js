import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connectToStores } from "fluxible-addons-react";
import Actions from "../../constants/Actions";
import ApiAction from "../../actions/Pages/ApiAction";

import BackBtn from "../Btns/BackBtn";
import HeaderBtn from "../Btns/HeaderBtn";

import GameBlock from "../Games/GameBlock";
import PredictionBlock from "../Predictions/PredictionBlock";
import PredictionsByGameTab from "../Predictions/PredictionsByGameTab";

if (process.env.BROWSER) {
  require("../../style/Pages/MainMenu.scss");
  require("../../style/Modal/Modal.scss");
}

class Modal extends Component {
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
    this.context.executeAction(ApiAction.getApi, { route, view: 'Game', action: Actions.APIOK_GAME });
    this.context.executeAction(ApiAction.getApi, { route, view: 'PredictionsByGameAndUser', action: Actions.APIOK_PREDICTIONS_BYGAMEANDUSER });
    this.context.executeAction(ApiAction.getApi, { route, view: 'Teams', action: Actions.APIOK_TEAMS });
    this.context.executeAction(ApiAction.getApi, { route, view: 'Users', action: Actions.APIOK_USERS });
    this.context.executeAction(ApiAction.getApi, { route, view: 'PredictionsByGame', action: Actions.APIOK_PREDICTIONS_BYGAME });
  }

  render() {
    const route = this.context.getStore("RouteStore").getCurrentRoute();
    const { gameData, predictionData, pending } = this.props;

    return (
      <div className="Modal">
        <div className="MainMenu">
          <div className="Left">
            <BackBtn />
          </div>
        </div>
        <div className="ModalBody">
          <div>
            <GameBlock />
            <PredictionBlock
              gameData={gameData}
              predictionData={predictionData}
              pending={pending} />

            {gameData && (gameData.status === 'IN_PROGRESS' || gameData.status === 'FINISHED') &&
              <PredictionsByGameTab />
            }
          </div>
        </div>
      </div>
    );
  }
}

Modal = connectToStores(Modal, ["GameBlockStore", "PredictionBlockStore"], (context) => {
  const route = context.getStore("RouteStore").getCurrentRoute();
  const game = route.query.game;
  return {
    gameData: context.getStore("GameBlockStore").getData(game),
    predictionData: context.getStore("PredictionBlockStore").getData(game),
    pending: context.getStore("PredictionBlockStore").getPending(),
  };
}, {getStore: PropTypes.func});

export default Modal;
