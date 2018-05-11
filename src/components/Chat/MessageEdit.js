import React, { Component } from "react";
import PropTypes from 'prop-types';
import TextareaAutosize from "react-textarea-autosize";
import labels from "../../labels";
import MessageEditAction from "../../actions/Pages/MessageEditAction";

if (process.env.BROWSER) {
  require("../../style/Chat/MessageEdit.scss");
}


class MessageEdit extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.refs.MessageInput.childNodes[0].addEventListener("keydown", (e) => {
      if (e.keyCode == 13 && !e.shiftKey){
        e.preventDefault();
        this.sendMessage(e);
      }
    });
  }

  sendMessage(e) {
    e.preventDefault();
    if (this.refs.MessageInput.childNodes[0].value != ''){
      const body = { text: this.refs.MessageInput.childNodes[0].value };
      this.refs.MessageInput.childNodes[0].value = '';
      let event = new Event('input', { bubbles: true });
      this.refs.MessageInput.childNodes[0].dispatchEvent(event);
      const route = this.context.getStore("RouteStore").getCurrentRoute();
      this.context.executeAction(MessageEditAction.createMessage, { route, body });
    }
  }

  render() {
    const { data } = this.props;

    return (
      <div className="MessageEdit">
        <form onSubmit={this.sendMessage.bind(this)}>
          <div className="Input" ref="MessageInput">
            <TextareaAutosize
              maxRows={5} />
          </div>
          <div className="Button">
            <button type="submit">{labels.send}</button>
          </div>
        </form>
      </div>
    );
  }
}

export default MessageEdit;
