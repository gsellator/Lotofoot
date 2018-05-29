import moment from "moment";

import config from "../../config";
moment.locale(config.language);

const FormatDate = {
  toStr(dte, format) {
    return moment(dte, 'YYYY-MM-DD').format(format);
  },

  dtetimeToStr(dte, format) {
    return moment(dte, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format(format);
  },

  dtetimeToFromNow(dte, format) {
    return moment(dte, 'YYYY-MM-DDTHH:mm:ss.SSSZ').fromNow();
  },

  dteToStr(dte, format) {
    return moment(dte).format(format);
  },

  todayToStr(format) {
    return moment().format(format);
  },

  isToday(dte) {
    return moment().isSame(dte, 'day');
  }
}
export default FormatDate;
