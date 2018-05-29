// Load different labels depending on the selected language
import config from "./config";

let labelsFile = "en.js";

switch(config.language) {
  case 'en':
    labelsFile = "en.js";
  break;
  case 'fr':
    labelsFile = "fr.js";
  break;
}

export default require("./labels/" + labelsFile).default;