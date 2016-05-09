import Actions from "../../constants/Actions";
import { getApi, postApi } from "../../actions/Pages/ApiAction";

const MessageEditAction = {
  createMessage(context, { route, body }) {
    return context.executeAction(postApi, { route, view: 'Messages', body, action: Actions.APIOK_MESSAGE_CREATE})
    .then((data) => {
      return Promise.all([
        context.executeAction(getApi, { route, view: 'GamesNext', action: Actions.APIOK_GAMES_NEXTMINI}),
        context.executeAction(getApi, { route, view: 'Messages', action: Actions.APIOK_MESSAGES }),
      ]);
    }, (err) =>{
      console.log('MessageEditAction error');
    });
  },
};

export default MessageEditAction;
