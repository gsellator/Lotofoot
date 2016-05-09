// Load different configs for production or development
let configFile = "dev.js";

if (process.env.APP_ENV === "prod") { configFile = "prod.js"; }
else if (process.env.APP_ENV === "pre") { configFile = "pre.js"; }

const config = require("../config/" + configFile);

export default config;