import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { NavLink, navigateAction, RouteStore } from "fluxible-router";
import Labels from "../constants/Labels";

import GameBlock from "../components/Games/GameBlock";
import GamesTab from "../components/Games/GamesTab";

import Actions from "../constants/Actions";

if (process.env.BROWSER) {
  require("../style/Pages/HomePage.scss");
}


class HomePage extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  componentDidMount() {
//    console.log('test1');
//    const route = this.context.getStore('RouteStore').getCurrentRoute();
//    if (route.getIn(["query", "msg"]) === 'new')
      // this.context.executeAction(initUpdate, {}); //'Pensez à consulter les règles !'
  }

  render() {
    return (
      <div className="HomePage">
        <div className="HomePageContainer">

          <GameBlock />
          <GamesTab />


          {false &&
            <div className="Paper" style={{textAlign: 'center'}}>
              <div className="PaperTitle">
                ACCUEIL
              </div>
              <div className="HomePageContent">
                <div style={{textAlign: 'center'}}>
                  {true && <span style={{display: 'inline-block'}} className="icn-200 footix"></span>}
                </div>
                <div>
                  <NavLink className="TxtBtn" routeName="games">
                    {Labels.games}
                  </NavLink>
                  <NavLink className="TxtBtn" routeName="predictions">
                    {Labels.predictions}
                  </NavLink>
                  <NavLink className="TxtBtn" routeName="ranking">
                    {Labels.ranking}
                  </NavLink>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

//HomePage = connectToStores(HomePage, ["LoginPageStore"], (context) => {
//  return {
//    credentials: context.getStore("LoginPageStore").getCredentials()
//  };
//}, {getStore: PropTypes.func});

export default HomePage;