import Actions from "../../constants/Actions";

export default {
  submitDialog(context, { }, done) {
    context.dispatch(Actions.DIALOG_SUBMIT);
    done();
  },
};