import React from "react";
import { NavLink, RouteStore } from "fluxible-router";

if (process.env.BROWSER) {
    require("../style/Pages/HomePage.scss");
}

class HomePage extends React.Component {

  render() {
    return <div className="HomePage">
      <div className="HomePageContainer">
        <div className="Paper" style={{textAlign: 'center'}}>
          <NavLink className="TxtBtn" routeName="login">
            Login
          </NavLink>
        </div>
      </div>
    </div>
  }

}

export default HomePage;
