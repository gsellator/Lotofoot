import Actions from "../../constants/Actions";

const DialogAction = {
  submitDialog(context, { }, done) {
    context.dispatch(Actions.DIALOG_SUBMIT);
    done();
  },
};

export default DialogAction;
