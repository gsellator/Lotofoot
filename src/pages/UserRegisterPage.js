import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { NavLink } from "fluxible-router";
import { postApi } from "../actions/Pages/ApiAction";
import { registerUser } from "../actions/Pages/UserRegisterAction";
import Labels from "../constants/Labels";

if (process.env.BROWSER) {
  require("../style/Pages/UserRegisterPage.scss");
}

class UserRegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      username: '',
      password: ''
    };
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  componentDidMount(){
    this.refs.firstNameInput.focus();
  }

  firstnameChanged(e) {
    this.setState({firstname: e.target.value});
  }

  usernameChanged(e) {
    this.setState({username: e.target.value});
  }

  passwordChanged(e) {
    this.setState({password: e.target.value});
  }

  registerUser(e) {
    e.preventDefault();
    const body = {
      email: this.state.username,
      password: this.state.password,
      firstName: this.state.firstname,
    }
    this.context.executeAction(registerUser, { body });
  }

  render() {
    const { pending } = this.props;
    const { firstname, username, password } = this.state;

    return (
      <div className="UserRegisterPage">
        <div className="UserRegisterPageContainer">
          <div className="UserRegisterPageContent">
            <form onSubmit={this.registerUser.bind(this)}>

              <div className="Input">
                <div className="Label">Prénom</div>
                <input type="text" value={firstname} onChange={this.firstnameChanged.bind(this)} ref="firstNameInput" required
                placeholder={Labels.required} autoComplete="off" spellCheck="false" autoCorrect="off" autoCapitalize="off" maxLength="1024"/>
              </div>
              <div className="Input">
                <div className="Label">Email</div>
                <input type="email" value={username} onChange={this.usernameChanged.bind(this)} required
                placeholder={Labels.required} autoComplete="off" spellCheck="false" autoCorrect="off" autoCapitalize="on" maxLength="1024"/>
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
