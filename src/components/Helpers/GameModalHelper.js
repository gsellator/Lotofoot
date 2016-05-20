import React from "react";
import { navigateAction } from "fluxible-router";
import { switchHasGameModal } from "../../actions/Games/GameModalAction";

const GameModalHelper = {
  openGameModalFct(game) {
    this.context.executeAction(switchHasGameModal, { hasGameModal: true, game });
    const route = this.context.getStore("RouteStore").getCurrentRoute();
    let url = route.url.substring(0, route.url.indexOf('?')) || route.url;
    if (game) { url = url + '?game=' + game };
    this.context.executeAction(navigateAction, { url });
  },

  closeGameModal() {
    this.context.executeAction(switchHasGameModal, { hasGameModal: false });
    const route = this.context.getStore("RouteStore").getCurrentRoute();
    let url = route.url.substring(0, route.url.indexOf('?')) || route.url;
    this.context.executeAction(navigateAction, { url });
  },
  
  altCloseGameModal(context) {
    context.executeAction(switchHasGameModal, { hasGameModal: false });
    const route = context.getStore("RouteStore").getCurrentRoute();
    let url = route.url.substring(0, route.url.indexOf('?')) || route.url;
    context.executeAction(navigateAction, { url });
  },
}

export default GameModalHelper;
