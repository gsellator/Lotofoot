import Actions from "../../constants/Actions";

const GameModalAction = {
  switchHasGameModal(context, { hasGameModal, game }, done) {
    context.dispatch(Actions.GAMEMODAL_SWITCH, { hasGameModal, game });
    done();
  },
};

export default GameModalAction;
