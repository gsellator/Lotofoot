import React, { Component } from "react";
import PropTypes from 'prop-types';
import { navigateAction } from "fluxible-router";

import DialogAction from "../../actions/Dialog/DialogAction";
import config from "../../config";

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
        <span>Le chargement de certaines données a pris trop de temps. Essayez de recharger la page et contactez-nous si le problème persiste.</span>
      </div>;
    } else if (error && error === 'Unauthorized'){
      msg = <div className="Txt">
        <span>La connexion a échoué, mot de passe ou identifiant incorrect.</span>
      </div>;
    } else {
      msg = <div className="Txt">
        <span>{errorTxt}</span>
      </div>;
    }

    if (errorTxt && (errorTxt === 'XMLHttpRequest timeout' || errorTxt === 'Internal XMLHttpRequest Error' || errorTxt.toLowerCase().indexOf('timeout of ') == 0 || errorTxt.indexOf('socket hang up') == 0)){
      btns = <div className="ButtonsBlock">
        <button ref="MainButton" type="submit" className="Button">Fermer</button>
        <div className="Button Green" onClick={this.reload.bind(this)}>Recharger la page</div>
      </div>;
    } else if (error && error === 'Unauthorized'){
      btns = <div className="ButtonsBlock">
        <button ref="MainButton" type="submit" className="Button">Fermer</button>
        <a className="Button Green" href="/recover">Mot de passe oublié</a>
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