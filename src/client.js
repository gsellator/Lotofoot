import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from 'react-hot-loader';
import app from "./app";

// Add promise support for browser not supporting it
import es6Promise from "es6-promise";
es6Promise.polyfill();

// Add tapEvent for fast click on iOS
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

let componentContext;
const dehydratedState = window.App;
const container = document.getElementById("root");

app.rehydrate(dehydratedState, (err, context) => {
  if (err) {
    throw err;
  }
  const Application = app.getComponent();
  componentContext = context.getComponentContext();

  ReactDOM.hydrate(
    <AppContainer>
      <Application context={context.getComponentContext()} />
    </AppContainer>,
    container
  );

  if (module.hot) {
    const newApp = require('./app').default;
    const NewApplication = newApp.getComponent();

    ReactDOM.unmountComponentAtNode(container);
    ReactDOM.render(
      <AppContainer>
        <NewApplication context={componentContext} />
      </AppContainer>,
      container
    );
  }
});

if (module.hot) {
  module.hot.accept('./app', () => {
    const newApp = require('./app').default;
    const NewApplication = newApp.getComponent();

    ReactDOM.unmountComponentAtNode(container);
    ReactDOM.render(
      <AppContainer>
        <NewApplication context={componentContext} />
      </AppContainer>,
      container
    );
  })
}