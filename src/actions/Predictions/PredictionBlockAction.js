import Actions from "../../constants/Actions";

const PredictionBlockAction = {
  initCreate(context, {}, done) {
    context.dispatch(Actions.PENDING_PREDICTIONS_CREATE);
    done();
  },

  initUpdate(context, {}, done) {
    context.dispatch(Actions.PENDING_PREDICTION_UPDATE);
    done();
  },
};

export default PredictionBlockAction;
