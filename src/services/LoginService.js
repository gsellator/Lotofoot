import request from "superagent";
const debug = require("debug")("lotofoot");
import config from "../config";

export default {
  name: "LoginService",

  read(req, resource, { username, password }, conf, done) {
    const url = config.hubUri + '/oauth/token';
    debug("Sending GET request to %s", url);
    request.post(url)
    .timeout(conf.timeout)
    .send('grant_type=password')
    .send('username=' + username)
    .send('password=' + password)
    .set('Authorization', 'Basic OWgwMDo5aDAwYmlnc2VjcmV0')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .end((err, res) => {
      debug("Received response %s from", res && res.status);
      if (err) {
        console.log('Login Res:', res);
        if (err.status) {err.statusCode = err.status;}
        if (res && res.error && res.error.text) {err.message = res.error.text;}
        return done(err);
      }
      done(null, res.body);
    });
  }
}
