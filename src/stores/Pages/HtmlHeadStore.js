import { BaseStore } from "fluxible/addons";
import Actions from "../../constants/Actions";

const BASE_URL = 'http://www.lotofoot.io/';

class HtmlHeadStore extends BaseStore {
  static storeName = "HtmlHeadStore"

  static handlers = {
    [Actions.NAVIGATE_SUCCESS]: "handleNavigateSuccess",
    [Actions.NAVIGATE_FAILURE]: "handleNavigateFailure"
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.siteName = 'Lotofoot.io';
    this.currentUrl = null;
    this.setInitialState();
  }

  setInitialState() {
    this.title = 'Lotofoot.io';
    this.description = 'Pronostiquez les matchs de l\'Euro 2016';
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
    return `${BASE_URL}${route.url}`;
  }

  handleNavigateSuccess() {
    this.setInitialState();
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