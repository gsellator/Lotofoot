// Code for google analytics to dangerously set into a script tag in HtmlDocument.js
// The {trackingId} must be replaced with that found in /config/*

const code = {
  dev: `var _gaq = _gaq || [];
    _gaq.push(['_setAccount', '{trackingId}']);
    _gaq.push(['_setDomainName', 'none']);
    _gaq.push(['_trackPageview', window.location.pathname]);
      (function () {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();`,
  prod: `var _gaq = _gaq || [];
    _gaq.push(['_setAccount', '{trackingId}']);
    _gaq.push(['_trackPageview', window.location.pathname]);
      (function () {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();`
};

export default code;