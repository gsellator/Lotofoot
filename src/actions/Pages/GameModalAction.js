import Actions from "../../constants/Actions";

export default {
  switchHasGameModal(context, { hasGameModal, game }, done) {
    context.dispatch(Actions.GAMEMODAL_SWITCH, { hasGameModal, game });
    done();
  },
};