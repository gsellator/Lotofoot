import Actions from "../../constants/Actions";

export default {
  setFilter(context, { newFilter }, done) {
    context.dispatch(Actions.GAMESTAB_SET_FILTER, newFilter);
    done();
  },

  setSubfilter(context, { newSubfilter }, done) {
    context.dispatch(Actions.GAMESTAB_SET_SUBFILTER, newSubfilter);
    done();
  },
};