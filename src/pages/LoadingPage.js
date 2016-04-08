import React from "react";

if (process.env.BROWSER) {
  require("../style/App/Loader.scss");
}

class LoadingPage extends React.Component {

  render() {
    return <div className="Loader" />;
  }

}

export default LoadingPage;
