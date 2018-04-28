import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connectToStores } from "fluxible-addons-react";
import { CSSTransitionGroup } from 'react-transition-group';

import NavSummary from "../../components/Pages/NavSummary";
import NavFull from "../../components/Pages/NavFull";

if (process.env.BROWSER) {
  require("../../style/Pages/Navs.scss");
}

class Navs extends Component {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    executeAction: PropTypes.func.isRequired
  }

  render() {
    const { hasNav, sections } = this.props;

    return (
      <div className="Navs">
        <NavSummary
          sections={sections} />

        <CSSTransitionGroup transitionName="Anim" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {hasNav &&
            <NavFull
              sections={sections} />
          }
        </CSSTransitionGroup>
      </div>
    );
  }
}

Navs = connectToStores(Navs, ["NavStore"], (context) => {
  return {
    hasNav: context.getStore("NavStore").hasNav(),
    sections: context.getStore("NavStore").getSections(),
  };
}, {getStore: PropTypes.func});

export default Navs;