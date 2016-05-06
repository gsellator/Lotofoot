import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { navigateAction, RouteStore } from "fluxible-router";
import TextareaAutosize from "react-textarea-autosize";
import Labels from "../../constants/Labels";
import { createMessage } from "../../actions/Chat/MessageEditAction";

if (process.env.BROWSER) {
  require("../../style/Chat/MessageEdit.scss");
}


class MessageEdit extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
  }

  sendMessage(e) {
    e.preventDefault();
    if (this.refs.MessageInput.childNodes[0].value != ''){
      const body = { text: this.refs.MessageInput.childNodes[0].value };
      this.refs.MessageInput.childNodes[0].value = '';
      
      let event = new Event('input', { bubbles: true });
      this.refs.MessageInput.childNodes[0].dispatchEvent(event);
      const route = this.context.getStore("RouteStore").getCurrentRoute();
//      this.context.executeAction(createMessage, { route, body });
    }
  }

  render() {
    const { data } = this.props;

    return (
      <div className="MessageEdit">
        <form onSubmit={this.sendMessage.bind(this)}>
          <div className="Input" ref="MessageInput">
            <TextareaAutosize maxRows={5} />
          </div>
          <div className="Button">
            <button type="submit">{Labels.send}</button>
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
