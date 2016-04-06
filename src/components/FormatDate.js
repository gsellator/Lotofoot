//import DteSelectorStore from "../stores/Tools/DteSelectorStore";

import moment from "moment";
moment.locale('fr');

const FormatDate = {
  toStr(dte, format) {
    return moment(dte).format(format);
  },
  
//  todayToStr(format) {
//    return moment().format(format);
//  },
//  
//  toStrMinus6(dte, format) {
//    return moment(dte).subtract(6, 'day').format(format);
//  },
//
//  unixtoStr: function(unix, format){
//    return moment(new Date(unix*1000)).startOf('day').format(format);
//  },
//
//  getConsoIcn: function(context, dteStr){
//    const consoDateStr = context.getStore(DteSelectorStore).getConsoDate();
//    if (consoDateStr){
//      const consoDate = moment(consoDateStr);
//      const dte = moment(dteStr);
//      if (!dte.isAfter(consoDate))
//        return 'icn-10 mod3';
//      else
//        return 'icn-10 mod2';
//    }
//    return '';
//  },
//  
//  getUnixConsoIcn: function(context, unixDteStr){
//    const consoDateStr = context.getStore(DteSelectorStore).getConsoDate();
//    if (consoDateStr){
//      const consoDate = moment(consoDateStr);
//      const dte = moment(new Date(unixDteStr*1000)).startOf('day');
//      if (!dte.isAfter(consoDate))
//        return 'icn-10 mod3';
//      else
//        return 'icn-10 mod2';
//    }
//    return '';
//  },
//  
//  isBefore: function(dte1, dte2){
//    return moment(dte1).isBefore(moment(dte2));
//  },
//  
//  isAfter: function(dte1, dte2){
//    return moment(dte1).isAfter(moment(dte2));
//  }
}
export default FormatDate;
