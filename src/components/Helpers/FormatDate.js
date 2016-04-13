import moment from "moment";
moment.locale('fr');

const FormatDate = {
  toStr(dte, format) {
    return moment(dte, 'YYYY-MM-DD').format(format);
  },

  dtetimeToStr(dte, format) {
    return moment(dte, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format(format);
  },

  dteToStr(dte, format) {
    return moment(dte).format(format);
  },

  todayToStr(format) {
    return moment().format(format);
  },
}
export default FormatDate;
