import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connectToStores } from "fluxible-addons-react";
import DialogAction from "../../actions/Dialog/DialogAction";
import labels from "../../labels";

if (process.env.BROWSER) {
  require("../../style/Dialog/Dialog.scss");
}

class Dialog extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }

  componentDidMount(){
    this.refs.DialogWindowButton.focus();
  }

  submitDialog(e) {
    e.preventDefault();
    this.context.executeAction(DialogAction.submitDialog);
  }

  render() {
    const { error, errorTxt } = this.props;

    return (
      <div className="Dialog">
        <div className="DialogWindow">
          <form onSubmit={this.submitDialog.bind(this)}>
            <div className="DialogWindowTxt">
              <span>{errorTxt}</span>
            </div>
            <div>
              <button ref="DialogWindowButton" type="submit" className="DialogWindowButton">{labels.ok}</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Dialog = connectToStores(Dialog, ["DialogStore"], (context) => {
  return {
    error: context.getStore("DialogStore").getError(),
    errorTxt: context.getStore("DialogStore").getErrorTxt()
  };
}, {getStore: PropTypes.func});

export default Dialog;
