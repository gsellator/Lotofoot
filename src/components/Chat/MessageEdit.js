import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { navigateAction, RouteStore } from "fluxible-router";
import Labels from "../../constants/Labels";

if (process.env.BROWSER) {
  require("../../style/Chat/MessageEdit.scss");
}


class MessageEdit extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  registerUser(e) {
//    e.preventDefault();
//    const body = {
//      email: this.state.username,
//      password: this.state.password,
//      firstName: this.state.firstname,
//    }
//    this.context.executeAction(registerUser, { body });
  }

  render() {
    const { data } = this.props;

    return (
      <div className="MessageEdit">
        <form onSubmit={this.registerUser.bind(this)}>
          <div className="Input">
            <input type="text" ref="messageInput" required
              placeholder={Labels.required} autoComplete="off" spellCheck="false" autoCorrect="off" autoCapitalize="off" maxLength="1024"/>
          </div>
        </form>
      </div>
    );
  }
}

//MessageEdit = connectToStores(MessageEdit, ["MessageEditStore"], (context) => {
//  return {
//    data: context.getStore("MessageEditStore").getData()
//  };
//}, {getStore: PropTypes.func});

export default MessageEdit;
