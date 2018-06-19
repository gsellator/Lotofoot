import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connectToStores } from "fluxible-addons-react";

import GameModalHelper from "../Helpers/GameModalHelper";

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
    this.KeyDownHandler = undefined;
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.KeyDownHandler = this.handleKeyDown.bind(this);
    document.body.addEventListener('keydown', this.KeyDownHandler);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.KeyDownHandler);
  }

  handleKeyDown(e){
    // Esc
    if (e.keyCode === 27) {
      const closeModal = GameModalHelper.closeGameModal.bind(this);
      closeModal();
    }
  }

  render() {
    const { url, gameData, predData, predPending, predictionsData, predictionsUsers, predictionsTeams } = this.props;
    const route = this.context.getStore("RouteStore").getCurrentRoute();
    const curUrl = (route.url.indexOf('?') !== -1) ? route.url : url;

    const ready = Boolean((url === curUrl) && gameData && predData);

    return (
      <div className="Modal">
        <div className="MainMenu">
          <div className="Left">
            <BackBtn />
          </div>
        </div>
        <div className="ModalBody">
          {!ready &&
            <div className="Paper">
              <div className="FootixLoader" />
            </div>
          }

          {ready &&
            <div>
              <GameBlock
                data={gameData} />

              <PredictionBlock
                gameData={gameData}
                predictionData={predData}
                pending={predPending} />

              {gameData && (gameData.status === 'IN_PROGRESS' || gameData.status === 'FINISHED') &&
                <PredictionsByGameTab
                  data={predictionsData}
                  users={predictionsUsers}
                  teamsData={predictionsTeams} />
              }
            </div>
          }
        </div>
      </div>
    );
  }
}

Modal = connectToStores(Modal, ["ModalStore", "PredictionsByGameTabStore", "TeamsDicoStore"], (context) => {
  return {
    url: context.getStore("ModalStore").getUrl(),
    gameData: context.getStore("ModalStore").getGameData(),
    predData: context.getStore("ModalStore").getPredData(),
    predPending: context.getStore("ModalStore").getPredPending(),

    predictionsData: context.getStore("PredictionsByGameTabStore").getData(),
    predictionsUsers: context.getStore("PredictionsByGameTabStore").getUsers(),
    predictionsTeams: context.getStore("TeamsDicoStore").getData()
  };
}, {getStore: PropTypes.func});

export default Modal;
