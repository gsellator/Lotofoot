// Load different labels depending on the selected language
let labelsFile = "en.js";

switch(process.env.LANGUAGE) {
  case 'en':
    labelsFile = "en.js";
  break;
  case 'fr':
    labelsFile = "fr.js";
  break;
}

export default require("./labels/" + labelsFile).default;