import request from "superagent";
const debug = require("debug")("lotofoot");
import config from "../config";

export default {
  name: "MeService",
  read(req, resource, { accessToken }, conf, done) {
    const url = config.hubUri + '/me?access_token=' + accessToken + '&app=' + 'neufh';//+ config.appName;

    debug("Sending GET request to %s", url);
    request.get(url)
    .timeout(conf.timeout)
    .end((err, res) => {
      debug("Received response %s from", res && res.status);
      if (err) {
        if (err.status) {err.statusCode = err.status;}
        if (res && res.error && res.error.text) {err.message = res.error.text;}
        return done(err);
      }
      done(null, res.body);
    });
  }
}
