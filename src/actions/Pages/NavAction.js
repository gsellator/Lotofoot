import Actions from "../../constants/Actions";

const NavAction = {
  switchNav(context, { }, done) {
    context.dispatch(Actions.ACCOUNT_DIALOG_CLOSE);
    context.dispatch(Actions.NAV_SWITCH);
    done();
  },

  closeNav(context, { }, done) {
    context.dispatch(Actions.NAV_CLOSE);
    done();
  }
};

export default NavAction;