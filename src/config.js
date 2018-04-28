// Load different configs for production or development
let configFile = "dev.js";

switch(process.env.APP_NAME) {
  case 'lotofoot-pre':
    configFile = "lotofoot-pre.js";
  break;
  case 'lotofoot':
    configFile = "lotofoot.js";
  break;
  case 'lotofoot-stationf':
    configFile = "lotofoot-stationf.js";
  break;
}

export default require("./config/" + configFile).default;