import GameModalHelper from "../../components/Helpers/GameModalHelper";
import { navigateAction } from "fluxible-router";

const NavHelper = {
  navToSectClick(sect){
    GameModalHelper.miniCloseGameModal(this.context);
    const route = this.context.getStore(RouteStore).getCurrentRoute();
    const newroute = this.context.getStore(RouteStore).makePath(sect);
    if (newroute && route.url != newroute)
      this.context.executeAction(navigateAction, { url: newroute });
  },
}

export default NavHelper;
