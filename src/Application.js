import config from "./config";
import React, { PropTypes, Component } from "react";
import { provideContext, connectToStores } from "fluxible-addons-react";
import { handleHistory, RouteStore } from "fluxible-router";
import moment from "moment";
import Immutable from "immutable";
import cookie from 'react-cookie';

import trackPageView from "./utils/trackPageView";
import Page from "./components/Pages/Page";
import NotFoundPage from "./pages/NotFoundPage";
//import ErrorPage from "./pages/ErrorPage";
import LoadingPage from "./pages/LoadingPage";

import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

var request = require('superagent-promise')(require('superagent'), Promise);

if (process.env.BROWSER) {
  require("./style/Application.scss");
  require("./style/Pages/Paper.scss");
}

class Application extends Component {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    executeAction: PropTypes.func.isRequired
  }

  static propTypes = {
    // props coming from fluxible-router's handleHistory
    currentRoute: PropTypes.object,
    currentNavigateError: PropTypes.shape({
      statusCode: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired
    }),

    // prop coming from HtmlHeadStore
    documentTitle: PropTypes.string
  }
  
  trackPage(accessToken, url) {
    const credentials = this.props.credentials;
    const group = credentials.group;
    const username = credentials.username;
    const role = credentials.role;
    const log = moment().format('YYYY-MM-DD HH:mm:ss - ') + ' - ' + window.location.href;
    trackPageView(url, group, username, role, accessToken, log);
  }

  componentDidMount(){
    const { currentRoute } = this.props;
    const accessToken = cookie.load('dld_authentication');
    this.trackPage(accessToken, currentRoute.get('url'));
  }

  componentDidUpdate(prevProps) {
    const { documentTitle, currentRoute } = this.props;
    const accessToken = cookie.load('dld_authentication');
    
    if (prevProps.documentTitle !== documentTitle) {
      document.title = documentTitle;
    }
    
    if (!Immutable.is(prevProps.currentRoute, currentRoute)) {
      this.trackPage(accessToken, currentRoute.get('url'));
    }
  }

  render() {
    const { currentRoute, currentNavigateError, isNavigateComplete } = this.props;

    let Handler = currentRoute && currentRoute.get("handler");

    let content;

    if (currentNavigateError && currentNavigateError.statusCode === 404) {
      // This "not found" error comes from a page init actions (InitActions.js)
      content = <NotFoundPage />;
    } else if (currentNavigateError) {
      // Generic error, usually always with statusCode 500
      // content = <ErrorPage err={currentNavigateError} />;
    } else if (!Handler) {
      // No handler: this is another case where a route is not found (e.g. is not defined in the routes.js config)
      content = <NotFoundPage />;
    } else if (!isNavigateComplete) {
      // Show a loading page while waiting the route's action to finish
      content = <LoadingPage />;
    } else {
      // Here you go with the actual page content
      const params = currentRoute.get("params").toJS();
      content = <Handler {...params} />;
    }
    return (
      <Page>
      { content }
      </Page>
    );
  }
}

Application = connectToStores(Application, ["HtmlHeadStore", "LoginPageStore"], (context) => {
  return {
    documentTitle: context.getStore("HtmlHeadStore").getTitle(),
    credentials: context.getStore("LoginPageStore").getCredentials()
  };
}, {getStore: PropTypes.func});

// Wrap with fluxible-router's history handler (required for routing)
// It also pass `currentRoute` as prop to the component
Application = handleHistory(Application);

// Wrap Application with the fluxible context (required)
Application = provideContext(Application);

export default Application;
