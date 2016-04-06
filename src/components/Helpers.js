import { RouteStore, navigateAction } from "fluxible-router";

const Helpers = {
  thClass(col, sortType) {
    if (sortType){
      if (sortType.indexOf(col) == -1){
        return "indicator";
      } else if (sortType.indexOf("-") == 0){
        return "indicator sort-ico desc";
      } else {
        return "indicator sort-ico asc";
      }
    }
    return "indicator";
  },

  navToSectClick(sect){
    const route = this.context.getStore(RouteStore).getCurrentRoute();
    const newroute = this.context.getStore(RouteStore).makePath(sect);
    if (newroute && route.getIn(["url"]) != newroute)
      this.context.executeAction(navigateAction, { url: newroute });
  },

  hasAccess(context, targetedRole){
//    const credentials = context.getStore(LoginPageStore).getCredentials();
//    const role = credentials ? credentials.role : '';
//
//    switch(targetedRole) {
//      case 'admin':
//        if (role === 'admin') {return true;}
//        return false;
//        break;
//      case 'mkt':
//        if (role === 'admin' || role === 'mkt') {return true;}
//        return false;
//        break;
//      case 'cxo':
//        if (role === 'admin' || role === 'mkt' || role === 'cxo') {return true;}
//        return false;
//        break;
//      case 'standard':
//        return true;
//        break;
//      default:
//        return false;
//    }
  }
}

export default Helpers;
