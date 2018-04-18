import React, { Component } from "react";
import PropTypes from 'prop-types';
import { provideContext, connectToStores } from "fluxible-addons-react";
import { handleHistory } from "fluxible-router";
import Immutable from "immutable";

import dailyStyles from "daily-styles";
import dailyIcons from "daily-icons";
import Pixels from "daily-icons/dist/js/Pixels";
import frenchTvLogos from "french-tv-logos";

import config from "./config";
import trackPageView from "./utils/trackPageView";
import Page from "./components/Pages/Page";
import NotFoundPage from "./pages/NotFoundPage";
import ErrorPage from "./pages/ErrorPage";

if (process.env.BROWSER) {
  require("./style/Pages/Application.scss");
  //require("./style/Pages/Paper.scss");
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
    })
  }

  getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  componentDidMount(){
    trackPageView({ route: this.props.currentRoute, credentials: this.props.credentials, accessToken: this.getCookie(config.cookie) });
  }

  componentDidUpdate(prevProps) {
    const { currentRoute } = this.props;

    if (!Immutable.is(prevProps.currentRoute, currentRoute)) {
      trackPageView({ route: currentRoute, credentials: this.props.credentials, accessToken: this.getCookie(config.cookie) });
    }
  }

  render() {
    const { currentRoute, currentNavigateError, isNavigateComplete } = this.props;

    let Handler = currentRoute && currentRoute.handler;

    let content;

    if (currentNavigateError && currentNavigateError.statusCode === 404) {
      // This "not found" error comes from a page init actions (InitActions.js)
      content = <NotFoundPage />;
    } else if (currentNavigateError) {
      // Generic error, usually always with statusCode 500
      content = <ErrorPage err={currentNavigateError} />;
    } else if (!Handler) {
      // No handler: this is another case where a route is not found (e.g. is not defined in the routes.js config)
      content = <NotFoundPage />;
    } else {
      // Here you go with the actual page content
      const params = currentRoute.params;
      content = <Handler {...params} />;
    }
    return (
      <Page>
        { content }

        <Pixels />
      </Page>
    );
  }
}

Application = connectToStores(Application, ["LoginStore"], (context) => {
  return {
    credentials: context.getStore("LoginStore").getCredentials()
  };
}, {getStore: PropTypes.func});

// Wrap with fluxible-router's history handler (required for routing)
// It also pass `currentRoute` as prop to the component
Application = handleHistory(Application);

// Wrap Application with the fluxible context (required)
Application = provideContext(Application);

export default Application;
