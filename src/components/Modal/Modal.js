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

  render() {
    const route = this.context.getStore("RouteStore").getCurrentRoute();
    const { gameData, predictionData, pending, predictionsData, predictionsUsers, predictionsTeams } = this.props;

    return (
      <div className="Modal">
        <div className="MainMenu">
          <div className="Left">
            <BackBtn />
          </div>
        </div>
        <div className="ModalBody">
          <div>
            <GameBlock
              data={gameData} />

            <PredictionBlock
              gameData={gameData}
              predictionData={predictionData}
              pending={pending} />

            {gameData && (gameData.status === 'IN_PROGRESS' || gameData.status === 'FINISHED') &&
              <PredictionsByGameTab
                data={predictionsData}
                users={predictionsUsers}
                teamsData={predictionsTeams} />
            }
          </div>
        </div>
      </div>
    );
  }
}

Modal = connectToStores(Modal, ["GameBlockStore", "PredictionBlockStore", "PredictionsByGameTabStore", "TeamsDicoStore"], (context) => {
  const route = context.getStore("RouteStore").getCurrentRoute();
  const game = route.query.game;
  return {
    gameData: context.getStore("GameBlockStore").getData(game),
    predictionData: context.getStore("PredictionBlockStore").getData(game),
    pending: context.getStore("PredictionBlockStore").getPending(),
    predictionsData: context.getStore("PredictionsByGameTabStore").getData(),
    predictionsUsers: context.getStore("PredictionsByGameTabStore").getUsers(),
    predictionsTeams: context.getStore("TeamsDicoStore").getData()
  };
}, {getStore: PropTypes.func});

export default Modal;
