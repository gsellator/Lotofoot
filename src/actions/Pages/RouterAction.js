import { navigateAction } from "fluxible-router";
import Actions from "../../constants/Actions";

export default {
  navTo(context, { sect, view, removeSuffix }, done) {
    const route = context.getStore("RouteStore").getCurrentRoute();
    const fullUrl = route.url;

    let suffix = '';
    if (!removeSuffix && fullUrl.indexOf('?') != -1)
      suffix = fullUrl.substring(fullUrl.indexOf('?'), fullUrl.length);

    const newroute = context.getStore("RouteStore").makePath(sect, {
      view: view,
    }) + suffix;

    if (newroute && route.url != newroute){
      context.executeAction(navigateAction, { url: newroute });
    }
    done();
  },
};