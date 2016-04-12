import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { navigateAction, RouteStore } from "fluxible-router";

if (process.env.BROWSER) {
  require("../../style/Games/GameBlock.scss");
}


class GameBlock extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  render() {
    const { data } = this.props;

    return (
      <div className="Paper GameBlock">
        {data &&
          <div>
            <div>data._id : {data._id}</div>
            <div>data.friendlyId : {data.friendlyId}</div>
            <div>data.phase : {data.phase}</div>
            <div>data.datetime : {data.datetime}</div>
            <div>data.stadium : {data.stadium}</div>
            <div>data.status : {data.status}</div>
            <div>data.channel : {data.channel}</div>
            <div>data.group : {data.group}</div>
            <div>data.createdAt : {data.createdAt}</div>
            <div>data.updatedAt : {data.updatedAt}</div>
            <div>data.teamA._id : {data.teamA._id}</div>
            <div>data.teamA.slug : {data.teamA.slug}</div>
            <div>data.teamA.name : {data.teamA.name}</div>
            <div>data.teamA.flagUrl : {data.teamA.flagUrl}</div>
            <div>data.teamB._id : {data.teamB._id}</div>
            <div>data.teamB.slug : {data.teamB.slug}</div>
            <div>data.teamB.name : {data.teamB.name}</div>
            <div>data.teamB.flagUrl : {data.teamB.flagUrl}</div>
          </div>
        }
      </div>
    );
  }
}

GameBlock = connectToStores(GameBlock, ["GameBlockStore"], (context) => {
  return {
    data: context.getStore("GameBlockStore").getData()
  };
}, {getStore: PropTypes.func});

export default GameBlock;