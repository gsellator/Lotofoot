import React, { Component } from "react";
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

import Modal from "./Modal";

if (process.env.BROWSER) {
  require("../../style/Modal/Modal.scss");
}

class ModalWrap extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired,
  }

  render() {
    const route = this.context.getStore("RouteStore").getCurrentRoute();
    const game = route.query.game;

    return (
      <CSSTransitionGroup transitionName="Anim" transitionEnterTimeout={500} transitionLeaveTimeout={800}>
        {game &&
          <Modal />
        }
      </CSSTransitionGroup>
    );
  }
}

export default ModalWrap;