import React, { Component, PropTypes } from "react";
import io from "socket.io-client";
import MessageEditAction from "../../actions/Chat/MessageEditAction";

class NotificationComponent extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  componentDidMount(){
    let socket = io.connect();
    
    socket.on('message', (data) => {
       console.log('new message received', data);
       this.context.executeAction(MessageEditAction.getMessages);
    });

      socket.on('update', (data) => {
       console.log('new unknown update received', data);
    });
  }

  render() {
    return (<div className="notificationComponent" />);
  }
}

export default NotificationComponent;