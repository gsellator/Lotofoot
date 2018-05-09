import React, { Component } from "react";
import PropTypes from 'prop-types';
import { NavLink } from "fluxible-router";

import Zabivaka from "./Zabivaka";
import LoaderSmall from "./LoaderSmall";

if (process.env.BROWSER) {
  require("../../style/Pages/RegisterPage.scss");
}

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstname: '',
      lastname: '',
      password: '',
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

  passwordFocus(value) {
    this.setState({ armsPos: value });
  }

  send(e) {
    e.preventDefault();
    const route = this.context.getStore('RouteStore').getCurrentRoute();
    const body = {
      email: this.state.email,
      username: this.state.email,
      password: this.state.password,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
    }
    this.context.executeAction(this.props.registerUser, {
      route,
      email: this.state.email,
      password: this.state.password,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
    });
  }

  render() {
    const { pending, success, labels } = this.props;
    const { email, password, firstname, lastname } = this.state;

    return (
      <div className="Register">
        <div className="Box">
          {!success &&
            <form onSubmit={this.send.bind(this)}>
              <Zabivaka
                eyesPos={this.state.eyesPos}
                armsPos={this.state.armsPos} />

              <fieldset>
              <legend>{labels.email}</legend>
              <div className="Input">
                <input className="emailStationF" type="email" value={email} onChange={this.inputChanged.bind(this, 'email')} ref="emailInput" required
                placeholder={labels.required} autoComplete="off" spellCheck="false" autoCorrect="off" autoCapitalize="on" maxLength="1024"
                onFocus={this.inputChanged.bind(this, 'email')} onBlur={this.inputBlur.bind(this)} />
                <select className="selectStationF" name="domain">
                  <option value="@hec.stationf.co">@hec.stationf.co</option>
                  <option value="@facebook.stationf.co">@facebook.stationf.co</option>
                  <option value="@numa.stationf.co">@numa.stationf.co</option>
                  <option value="@shakeupfactory.stationf.co">@shakeupfactory.stationf.co</option>
                  <option value="@ponts-alliance.stationf.co">@ponts-alliance.stationf.co</option>
                  <option value="@ouicrea.stationf.co">@ouicrea.stationf.co</option>
                  <option value="@adn-ifm.stationf.co">@adn-ifm.stationf.co</option>
                  <option value="@edhec.stationf.co">@edhec.stationf.co</option>
                  <option value="@ashoka.stationf.co">@ashoka.stationf.co</option>
                  <option value="@ubisoft.stationf.co">@ubisoft.stationf.co</option>
                  <option value="@zendesk.stationf.co">@zendesk.stationf.co</option>
                  <option value="@impulse-partners.stationf.co">@impulse-partners.stationf.co</option>
                  <option value="@schoolab.stationf.co">@schoolab.stationf.co</option>
                  <option value="@bnp-plugandplay.stationf.co">@bnp-plugandplay.stationf.co</option>
                  <option value="@microsoft.stationf.co">@microsoft.stationf.co</option>
                  <option value="@omn.stationf.co">@omn.stationf.co</option>
                  <option value="@naver.stationf.co">@naver.stationf.co</option>
                  <option value="@ama.stationf.co">@ama.stationf.co</option>
                  <option value="@cnpa.stationf.co">@cnpa.stationf.co</option>
                  <option value="@offices.stationf.co">@offices.stationf.co</option>
                  <option value="@founders.stationf.co">@founders.stationf.co</option>
                  <option value="@icm.stationf.co">@icm.stationf.co</option>
                  <option value="@havas.stationf.co">@havas.stationf.co</option>
                  <option value="@thales.stationf.co">@thales.stationf.co</option>
                  <option value="@impulse-venteprivee.stationf.co">@impulse-venteprivee.stationf.co</option>
                  <option value="@usineio.stationf.co">@usineio.stationf.co</option>
                  <option value="@vc.stationf.co">@vc.stationf.co</option>
                  <option value="@lvmh.stationf.co">@lvmh.stationf.co</option>
                  <option value="@insead.stationf.co">@insead.stationf.co</option>
                  <option value="@tf1.stationf.co">@tf1.stationf.co</option>
                  <option value="@loreal.stationf.co">@loreal.stationf.co</option>
                  <option value="@chainaccelerator.stationf.co">@chainaccelerator.stationf.co</option>
                  <option value="@stationf.co">@stationf.co</option>
              </select>
                </div>
              </fieldset> 

              <div className="Input">
                <div className="Label">{labels.firstname}</div>
                <input type="text" value={firstname} onChange={this.inputChanged.bind(this, 'firstname')} required
                placeholder={labels.required} autoComplete="off" spellCheck="false" autoCorrect="off" autoCapitalize="off" maxLength="1024"
                onFocus={this.inputChanged.bind(this, 'firstname')} onBlur={this.inputBlur.bind(this)} />
              </div>

              <div className="Input">
                <div className="Label">{labels.lastname}</div>
                <input type="text" value={lastname} onChange={this.inputChanged.bind(this, 'lastname')} required
                placeholder={labels.required} autoComplete="off" spellCheck="false" autoCorrect="off" autoCapitalize="off" maxLength="1024"
                onFocus={this.inputChanged.bind(this, 'lastname')} onBlur={this.inputBlur.bind(this)} />
              </div>

              <div className="Input">
                <div className="Label">{labels.password}</div>
                <input type="password" value={password} onChange={this.inputChanged.bind(this, 'password')} required
                placeholder={labels.required} autoComplete="off" spellCheck="false" autoCorrect="off" autoCapitalize="off" maxLength="1024"
                onFocus={this.passwordFocus.bind(this, true)} onBlur={this.passwordFocus.bind(this, false)} />
              </div>
              

              <div className="Button">
                {!pending &&
                  <button type="submit">
                    {labels.createAccount}
                  </button>
                }
                {pending &&
                  <button type="submit">
                    <LoaderSmall />
                  </button>
                }
              </div>
            </form>
          }

          {success &&
            <div>
             <div className="title">
                {labels.wellReceived}
              </div>
              <div className="text">
                {labels.registerSuccessText}
              </div>
              <NavLink className="OnBoardBtn" routeName="home">
                {labels.registerSuccessAction}
              </NavLink>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default Register;

