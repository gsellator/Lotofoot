import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connectToStores } from "fluxible-addons-react";

import UsersTab from "../components/Ranking/UsersTab";

class RankingPage extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  render() {
    const { credentials, data } = this.props;

    return (
      <div className="ScrollPage">
        {!data && <div className="FootixLoader" />}
        {data &&
          <div className="RankingPageContainer">
            <UsersTab
              credentials={credentials}
              data={data} />
          </div>
        }
      </div>
    );
  }
}

RankingPage = connectToStores(RankingPage, ["LoginStore", "UsersTabStore"], (context) => {
  return {
    credentials: context.getStore("LoginStore").getCredentials(),
    data: context.getStore("UsersTabStore").getData()
  };
}, {getStore: PropTypes.func});

export default RankingPage;
