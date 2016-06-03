import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { NavLink } from "fluxible-router";
import { postApi } from "../actions/Pages/ApiAction";
import { registerUser } from "../actions/Pages/UserRegisterAction";
import Labels from "../Labels";
import config from "../config";

if (process.env.BROWSER) {
  require("../style/Pages/UserRegisterPage.scss");
  require("../style/Pages/LandingBack.scss");
}

class UserRegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      password: ''
    };
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  componentDidMount(){
    this.refs.emailInput.focus();
  }

  firstnameChanged(e) {
    this.setState({firstname: e.target.value});
  }

  lastnameChanged(e) {
    this.setState({lastname: e.target.value});
  }

  usernameChanged(e) {
    this.setState({username: e.target.value});
  }

  emailChanged(e) {
    this.setState({email: e.target.value});
  }

  passwordChanged(e) {
    this.setState({password: e.target.value});
  }

  registerUser(e) {
    e.preventDefault();
    const body = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      firstName: this.state.firstname,
      lastName: this.state.lastname,
    }
    this.context.executeAction(registerUser, { body });
  }

  render() {
    const { pending } = this.props;
    const { firstname, lastname, username, password, email } = this.state;

    return (
      <div className="UserRegisterPage LandingBack">
        <div className="UserRegisterPageContainer">
          <div className="UserRegisterPageContent">
            <form onSubmit={this.registerUser.bind(this)}>
              <div className={'LoginLogo ' + config.appName}></div>
              <div className="Input">
                <div className="Label">Email</div>
                <input type="email" value={email} onChange={this.emailChanged.bind(this)} ref="emailInput" required
                placeholder={Labels.required} autoComplete="off" spellCheck="false" autoCorrect="off" autoCapitalize="on" maxLength="1024"/>
              </div>
              <div className="Input">
                <div className="Label">Pseudo</div>
                <input type="pseudo" value={username} onChange={this.usernameChanged.bind(this)} ref="usernameInput" required
                placeholder={Labels.required} autoComplete="off" spellCheck="false" autoCorrect="off" autoCapitalize="on" maxLength="1024"/>
              </div>
              <div className="Input">
                <div className="Label">Prénom</div>
                <input type="text" value={firstname} onChange={this.firstnameChanged.bind(this)} required
                placeholder={Labels.required} autoComplete="off" spellCheck="false" autoCorrect="off" autoCapitalize="off" maxLength="1024"/>
              </div>
              <div className="Input">
                <div className="Label">Nom</div>
                <input type="text" value={lastname} onChange={this.lastnameChanged.bind(this)} required
                placeholder={Labels.required} autoComplete="off" spellCheck="false" autoCorrect="off" autoCapitalize="off" maxLength="1024"/>
              </div>
              <div className="Input">
                <div className="Label">Mot de passe</div>
                <input type="password" value={password} onChange={this.passwordChanged.bind(this)} required
                autoComplete="off" spellCheck="false" autoCorrect="off" autoCapitalize="off" maxLength="1024" />
              </div>
              {!pending &&
                <button type="submit">{Labels.createAccount}</button>
              }
              {pending &&
                <button type="submit">
                  <div className="Loader"></div>
                </button>
              }

              {config.appName === 'lotofoot-lecab' &&
                <div className="ButtonGroup">
                  <span className="LoginLinkSpacer">Seuls les chauffeurs-partenaires LeCab pourront recevoir les lots mis en jeu</span>
                </div>
              }

              <div>
                <NavLink className="LoginLink" routeName="login">{Labels.backHome}</NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

UserRegisterPage = connectToStores(UserRegisterPage, ["UserRegisterPageStore"], (context) => {
  return {
    pending: context.getStore("UserRegisterPageStore").getPending(),
  };
}, {getStore: PropTypes.func});

export default UserRegisterPage;
