import { RouteStore, navigateAction } from "fluxible-router";

const NavHelper = {
//  thClass(col, sortType) {
//    if (sortType){
//      if (sortType.indexOf(col) == -1){
//        return "indicator";
//      } else if (sortType.indexOf("-") == 0){
//        return "indicator sort-ico desc";
//      } else {
//        return "indicator sort-ico asc";
//      }
//    }
//    return "indicator";
//  },

  navToSectClick(sect){
    const route = this.context.getStore(RouteStore).getCurrentRoute();
    const newroute = this.context.getStore(RouteStore).makePath(sect);
    if (newroute && route.getIn(["url"]) != newroute)
      this.context.executeAction(navigateAction, { url: newroute });
  },
}

export default NavHelper;
