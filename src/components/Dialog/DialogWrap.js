import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connectToStores } from "fluxible-addons-react";
import { CSSTransitionGroup } from 'react-transition-group';

import Dialog from "./Dialog";

class DialogWrap extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired,
  }

  render() {
    const { hasDialog, error, errorTxt } = this.props;

    return (
      <CSSTransitionGroup transitionName="Anim" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
        {hasDialog &&
          <Dialog
            error={error}
            errorTxt={errorTxt} />
        }
      </CSSTransitionGroup>
    );
  }
}

DialogWrap = connectToStores(DialogWrap, ["DialogStore"], (context) => {
  return {
    hasDialog: context.getStore("DialogStore").hasDialog(),
    error: context.getStore("DialogStore").getError(),
    errorTxt: context.getStore("DialogStore").getErrorTxt(),
  };
}, {getStore: PropTypes.func});

export default DialogWrap;