import GameModalHelper from "../../components/Helpers/GameModalHelper";
import { navigateAction } from "fluxible-router";
import RouterAction from "../../actions/Pages/RouterAction";

const NavHelper = {
  navToSectClick(sect){
    this.context.executeAction(RouterAction.navTo, { sect, view: '', removeSuffix: true });
  },
}

export default NavHelper;
