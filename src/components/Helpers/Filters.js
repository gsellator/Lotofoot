const padStr = (input) => {
  return (input < 10) ? "0" + input : "" + input;
};

const Filters = {
  padStr,

  capitalize(input) {
    if (input){
      input = input.toLowerCase();
      return input.substring(0,1).toUpperCase()+input.substring(1);
    }
    return '';
  },

  toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  },
}

export default Filters;
