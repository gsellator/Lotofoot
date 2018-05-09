import React, { Component } from "react";
import PropTypes from 'prop-types';
import { NavLink } from "fluxible-router";

import Zabivaka from "./Zabivaka";
import LoaderSmall from "./LoaderSmall";

if (process.env.BROWSER) {
  require("../../style/Widgets/Login.scss");
}

class RecoverInit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      eyesPos: 0,
      armsPos: false,
    };
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired,
  }

  inputChanged(name, e) {
    const txt = e.target ? e.target.value : '';
    this.setState({
      [name]: txt,
      eyesPos: (txt.length + 1) < 36 ? (txt.length + 1) / 2 : 18,
    });
  }

  inputBlur() {
    this.setState({ eyesPos: 0 });
  }

  send(e) {
    e.preventDefault();
    const route = this.context.getStore('RouteStore').getCurrentRoute();
    this.context.executeAction(this.props.sendemail, { route, email: this.state.email.replace(/ /g,'') });
  }

  render() {
    let { pending, success, labels } = this.props;
    let { email } = this.state;

    return (
      <div className="Login">
        <div className="Box">
          <form onSubmit={this.send.bind(this)}>
            <Zabivaka
              eyesPos={this.state.eyesPos}
              armsPos={this.state.armsPos} />

            {!success &&
              <div>
                <div className="title">
                  {labels.recoverInitTitle}
                </div>
                <div className="text">
                  {labels.recoverInitText}
                </div>
                <div className="Input">
                  <input type="email" ref="emailInput" value={email} onChange={this.inputChanged.bind(this, 'email')} placeholder={labels.emailExample} required
                    autoComplete="on" spellCheck="false" autoCorrect="off" autoCapitalize="off" maxLength="1024"
                    onFocus={this.inputChanged.bind(this, 'email')} onBlur={this.inputBlur.bind(this)} />
                </div>
                <div className="Button">
                  {!pending &&
                    <button type="submit">{labels.resetPassword}</button>
                  }
                  {pending &&
                    <button type="submit">
                      <LoaderSmall />
                    </button>
                  }
                </div>
              </div>
            }

            {success &&
              <div>
                <div className="title">
                  {labels.recoverInitTitleOk}
                </div>
                <div className="text">
                  {labels.recoverInitTextOk + email + '.'}
                </div>
              </div>
            }
          </form>
        </div>
      </div>
    );
  }
}

export default RecoverInit;