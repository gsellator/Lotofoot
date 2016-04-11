import Actions from "../../constants/Actions";

const GamesTabAction = {
  setTab(context, { newTab }, done) {
    context.dispatch(Actions.GAMESTAB_SET_TAB, newTab);
    done();
  },
};

export default GamesTabAction;
