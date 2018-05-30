import Actions from "../../constants/Actions";
import ApiAction from "../../actions/Pages/ApiAction";

export default {
  createMessage(context, { route, body }) {
    return context.executeAction(ApiAction.postApi, { route, view: 'Messages', body, action: Actions.APIOK_MESSAGE_CREATE})
    .then((data) => {
      return Promise.all([
        context.executeAction(ApiAction.getApi, { route, view: 'Messages', action: Actions.APIOK_MESSAGES }),
      ]);
    }, (err) =>{
      console.log('MessageEditAction error');
    });
  },

  getMessages(context, { route, body }) {
    return context.executeAction(ApiAction.getApi, { route, view: 'Messages', action: Actions.APIOK_MESSAGES })
    .then(() => {
      return;
    }, (err) => {
      console.log('GetMessages Error : ', err.message);
      return;
    });
  }
};