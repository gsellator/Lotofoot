import React, { Component } from "react";
import PropTypes from 'prop-types';
import { navigateAction } from "fluxible-router";

import DialogAction from "../../actions/Dialog/DialogAction";
import config from "../../config";

import labels from "../../labels";

if (process.env.BROWSER) {
  require("../../style/Dialog/Dialog.scss");
}

class Dialog extends Component {
  constructor(props) {
    super(props);
    this.KeyDownHandler = undefined;
  }

  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    executeAction: PropTypes.func.isRequired
  }

  componentDidMount(){
    this.KeyDownHandler = this.handleKeyDown.bind(this);
    document.body.addEventListener('keydown', this.KeyDownHandler);
    this.refs.MainButton.focus();
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.KeyDownHandler);
  }

  handleKeyDown(e){
    // Esc
    if (e.keyCode === 27) {
      const submitDialog = this.submitDialog.bind(this, e);
      submitDialog();
    }
  }

  submitDialog(e) {
    e.preventDefault();
    this.context.executeAction(DialogAction.submitDialog);
  }

  reload(){
    location.reload();
  }

  render() {
    const { error, errorTxt } = this.props;
    let msg, btns;

    if (errorTxt && (errorTxt === 'XMLHttpRequest timeout' || errorTxt === 'Internal XMLHttpRequest Error' || errorTxt.toLowerCase().indexOf('timeout of ') == 0 || errorTxt.indexOf('socket hang up') == 0)){
      msg = <div className="Txt">
        <span>{labels.errorTimeOut}</span>
      </div>;
    } else if (error && (error === 'Unauthorized' || error === 'Not Found')){
      msg = <div className="Txt">
        <span>{labels.errorLogin}</span>
      </div>;
    } else {
      msg = <div className="Txt">
        <span>{errorTxt}</span>
      </div>;
    }

    if (errorTxt && (errorTxt === 'XMLHttpRequest timeout' || errorTxt === 'Internal XMLHttpRequest Error' || errorTxt.toLowerCase().indexOf('timeout of ') == 0 || errorTxt.indexOf('socket hang up') == 0)){
      btns = <div className="ButtonsBlock">
        <button ref="MainButton" type="submit" className="Button">{labels.dialogClose}</button>
        <div className="Button Green" onClick={this.reload.bind(this)}>{labels.dialogRefresh}</div>
      </div>;
    } else if (error && (error === 'Unauthorized' || error === 'Not Found')){
      btns = <div className="ButtonsBlock">
        <button ref="MainButton" type="submit" className="Button">{labels.dialogClose}</button>
        <a className="Button Green" href="/recover">{labels.dialogForgot}</a>
      </div>;
    } else {
      btns = <div className="ButtonsBlock">
        <button ref="MainButton" type="submit" className="Button">OK</button>
      </div>;
    }

    return (
      <div className="Dialog">
        <div className="Window">
          <form onSubmit={this.submitDialog.bind(this)}>
            {msg}
            {btns}
          </form>
        </div>
      </div>
    );
  }
}

export default Dialog;