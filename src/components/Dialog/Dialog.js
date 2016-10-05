import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import DialogAction from "../../actions/Dialog/DialogAction";
import Labels from "../../Labels";

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
              <button ref="DialogWindowButton" type="submit" className="DialogWindowButton">{Labels.ok}</button>
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
