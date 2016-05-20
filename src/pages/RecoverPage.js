import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { RouteStore, navigateAction, NavLink } from "fluxible-router";
import { recoverUpdate } from "../actions/Pages/RecoverAction";
import Labels from "../Labels";

if (process.env.BROWSER) {
  require("../style/Pages/RecoverPage.scss");
  require("../style/Pages/LandingBack.scss");
}

class RecoverPage extends Component {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    executeAction: PropTypes.func.isRequired
  }

  componentDidMount(){
    if (!this.props.initFailure && !this.props.success)
      this.refs.passwordInput.focus();
    this.componentDidUpdate();
  }

  componentDidUpdate(){
    if (this.props.initFailure){
      const newroute = this.context.getStore(RouteStore).makePath('recoverInit');
      this.context.executeAction(navigateAction, { url: newroute });
    }
  }

  sendPassword(e) {
    e.preventDefault();
    const route = this.context.getStore(RouteStore).getCurrentRoute();
    const password = this.refs.passwordInput.value;
    this.context.executeAction(recoverUpdate, { route, password });
  }

  render() {
    const { pending, success, username } = this.props;

    return (
      <div className="RecoverPage LandingBack">
        <div className="RecoverPageContainer">
          <div className="RecoverPageContent">
            <form onSubmit={this.sendPassword.bind(this)}>
              {!success &&
                <div>
                  <div className="title">
                    {Labels.recoverTitle}
                  </div>
                  <div>
                    <input type="password"
                      ref="passwordInput"
                      placeholder={Labels.newPassword}
                      autoComplete="off" spellCheck="false" autoCorrect="off" autoCapitalize="off" maxLength="1024" />
                  </div>
                  {!pending &&
                    <button type="submit">{Labels.resetPassword}</button>
                  }
                  {pending &&
                    <button type="submit">
                      <div className="Loader"></div>
                    </button>
                  }
                </div>
              }
              {success &&
                <div>
                  <div className="title">
                    Bien reçu !
                  </div>
                  <div className="text">
                    Votre mot de passe a été modifié.
                  </div>
                  <div>
                    <NavLink className="TxtBtn" routeName="games">
                      Accéder au lotofoot
                    </NavLink>
                  </div>
                </div>
              }
            </form>
          </div>
        </div>
      </div>
    );
  }
}

RecoverPage = connectToStores(RecoverPage, ["RecoverPageStore"], (context) => {
  return {
    initFailure: context.getStore("RecoverPageStore").getInitFailure(),
    pending: context.getStore("RecoverPageStore").getPending(),
    success: context.getStore("RecoverPageStore").getSuccess(),
    username: context.getStore("RecoverPageStore").getUsername(),
  };
}, {getStore: PropTypes.func});

export default RecoverPage;
