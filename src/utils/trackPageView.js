// Track a pageview with Google Analytics

function trackPageView({ email, url, log }) {
  if (!window._gaq)
    return;

  if (email) {window._gaq.push(["_setCustomVar", 1, 'email', email, 2]);}
  if (log) {window._gaq.push(["_setCustomVar", 2, 'log', log, 2]);}
  window._gaq.push(['_trackPageview', url]);
}

export default trackPageView;
