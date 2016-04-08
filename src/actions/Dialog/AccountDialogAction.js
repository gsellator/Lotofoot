import Actions from "../../constants/Actions";

const AccountDialogAction = {
  switchAccountDialog(context, { }, done) {
    context.dispatch(Actions.NAV_CLOSE);
    context.dispatch(Actions.ACCOUNT_DIALOG_SWITCH);
    done();
  },
  
  closeAccountDialog(context, { }, done) {
    context.dispatch(Actions.ACCOUNT_DIALOG_CLOSE);
    done();
  }
};

export default AccountDialogAction;