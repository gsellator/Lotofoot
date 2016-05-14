import Actions from "../../constants/Actions";

const GamesTabAction = {
  setFilter(context, { newFilter }, done) {
    context.dispatch(Actions.GAMESTAB_SET_FILTER, newFilter);
    done();
  },

  setSubfilter(context, { newSubfilter }, done) {
    context.dispatch(Actions.GAMESTAB_SET_SUBFILTER, newSubfilter);
    done();
  },
};

export default GamesTabAction;
