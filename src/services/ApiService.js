import request from "superagent";
import { assign } from "lodash";
import config from "../config";
const debug = require("debug")("lotofoot");

export default {
  name: "ApiService",
  read(req, resource, { endpoint }, conf, done) {
    const url = config.apiUri + endpoint;
    debug("Sending GET request to %s", url);
    request.get(url)
    .timeout(conf.timeout)
    .end((err, res) => {
      debug("Received response %s from %s", res && res.status, url);
      if (err) {
        if (err.status) {err.statusCode = err.status;}
        if (res && res.error && res.error.text) {err.message = res.error.text;}
        return done(err);
      }
      done(null, res.body);
    });
  },

  create(req, resource, { endpoint }, body, conf, done) {
    const url = config.apiUri + endpoint;
    debug("Sending POST request to %s", url, body);
    request.post(url)
    .timeout(conf.timeout)
    .send(body)
    .end((err, res) => {
      if (err) {
        if (err.status) {err.statusCode = err.status;}
        if (res && res.error && res.error.text) {err.message = res.error.text;}
        return done(err);
      }
      debug("Received response %s from", res && res.status);
      done(null, res.body);
    });
  },

  update(req, resource, { endpoint }, body, conf, done) {
    const url = config.apiUri + endpoint;
    debug("Sending PUT request to %s", url, body);
    request.put(url)
    .timeout(conf.timeout)
    .send(body)
    .end((err, res) => {
      if (err) {
        if (err.status) {err.statusCode = err.status;}
        if (res && res.error && res.error.text) {err.message = res.error.text;}
        return done(err);
      }
      debug("Received response %s from", res && res.status);
      done(null, res.body);
    });
  }
};
