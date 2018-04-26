// Load different configs for production or development
let configFile = "dev.js";

switch(process.env.APP_NAME) {
  case 'lotofoot-pre':
    configFile = "lotofoot-pre.js";
  break;
  case 'lotofoot':
    configFile = "lotofoot.js";
  break;
  case 'lotofoot-lecab':
    configFile = "lotofoot-lecab.js";
  break;
  case 'lotofoot-sf':
    configFile = "lotofoot-sf.js";
  break;
}

export default require("./config/" + configFile).default;