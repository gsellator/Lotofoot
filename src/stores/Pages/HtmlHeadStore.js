import { BaseStore } from "fluxible/addons";
import Actions from "../../constants/Actions";
import config from "../../config";

const BASE_URL = config.baseUrl;

class HtmlHeadStore extends BaseStore {
  static storeName = "HtmlHeadStore"

  static handlers = {
//    [Actions.NAVIGATE_START]: "handleNavigateStart",
    [Actions.NAVIGATE_SUCCESS]: "handleNavigateSuccess",
    [Actions.NAVIGATE_FAILURE]: "handleNavigateFailure"
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.siteName = config.appFullName;
    this.currentUrl = null;
    this.setInitialState();
  }

  setInitialState() {
    this.title = config.appFullName;
    this.description = config.description;
  }

  getTitle() {
    return this.title;
  }

  getDescription() {
    return this.description;
  }

  getSiteName() {
    return this.siteName;
  }

  getCurrentUrl() {
    const route = this.dispatcher.getStore("RouteStore").getCurrentRoute();
    if (!route) {
      return BASE_URL;
    }
    return `${BASE_URL}${route.get("url")}`;
  }

//  handleNavigateStart() {
//    // Use a loading title when loading the route
//    this.title = 'LOADING';
//    this.emitChange();
//  }


  handleNavigateSuccess(route) {
    switch (route.get("name")) {
      case "home":
        this.title = 'Lotofoot.io';
        this.description = 'Lotofoot Euro 2016';
        break;
      case "login":
        this.title = 'Lotofoot';
        this.description = 'Lotofoot Euro 2016';
        break;
      default:
        this.setInitialState();
    }
    this.emitChange();
  }

  handleNavigateFailure(error) {
    if (error.statusCode === 404) {
      this.title = 'Not found';
    }
    else {
      this.title = 'error';
    }
    this.emitChange();
  }
}

export default HtmlHeadStore;