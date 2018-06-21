import Actions from "../../constants/Actions";

export default {
  showDialog(context, { errorTxt }, done) {
    context.dispatch(Actions.DIALOG_SHOW, { error: 'error', errorTxt });
    done();
  },

  submitDialog(context, { }, done) {
    context.dispatch(Actions.DIALOG_SUBMIT);
    done();
  },
};