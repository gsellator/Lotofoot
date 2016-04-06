import Actions from "../../constants/Actions";

const DialogAction = {
  submitDialog(context, { }, done) {
    context.dispatch(Actions.DIALOG_SUBMIT);
    done();
  },

  showDialog(context, { txt }, done) {
    context.dispatch(Actions.DIALOG_SHOW, txt);
    done();
  }
};

export default DialogAction;
