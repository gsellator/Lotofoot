import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { NavLink } from "fluxible-router";
import { postApi } from "../actions/Pages/ApiAction";
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
    executeAction: PropTypes.func.isRequired
  }

//  componentDidMount(){
//    this.refs.loginInput.focus();
//  }

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
//    this.context.executeAction(initCreate, {});
    const route = this.context.getStore("RouteStore").getCurrentRoute();

    const body = {
      email: this.state.firstname,
      password: this.state.username,
      firstName: this.state.password,
    }

    this.context.executeAction(postApi, { route, view: 'UsersRegister', body, action: Actions.APIOK_USER_REGISTER});
  }

  render() {
    const { pending } = this.props;
    const { firstname, username, password } = this.state;

    return (
      <div className="UserRegisterPage">
        <div className="UserRegisterPageContainer">
          <div className="UserRegisterPageContent">
            <form onSubmit={this.registerUser.bind(this)}>

              <div>
                <input type="text" value={firstname} onChange={this.firstnameChanged.bind(this)}
                placeholder={Labels.required} autoComplete="off" spellCheck="false" autoCorrect="off" autoCapitalize="off" maxLength="1024"/>
              </div>
              <div>
                <input type="email" value={username} onChange={this.usernameChanged.bind(this)}
                placeholder={Labels.required} autoComplete="off" spellCheck="false" autoCorrect="off" autoCapitalize="on" maxLength="1024"/>
              </div>
              <div>
                <input type="password" value={password} onChange={this.passwordChanged.bind(this)}
                autoComplete="off" spellCheck="false" autoCorrect="off" autoCapitalize="off" maxLength="1024" />
              </div>
              {!pending &&
                <button type="submit">{Labels.login}</button>
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
