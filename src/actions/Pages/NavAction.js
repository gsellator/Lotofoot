import Actions from "../../constants/Actions";

export default {
  switchNav(context, { }, done) {
    context.dispatch(Actions.NAV_SWITCH);
    done();
  },

  closeNav(context, { }, done) {
    context.dispatch(Actions.NAV_CLOSE);
    done();
  }
};