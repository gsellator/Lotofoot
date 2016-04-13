import React from "react";

if (process.env.BROWSER) {
  require("../style/App/Loader.scss");
}

class LoadingPage extends React.Component {

  render() {
    return <div className="LoaderContainer"><div className="Loader" /></div>;
  }

}

export default LoadingPage;
