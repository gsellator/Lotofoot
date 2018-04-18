// Track a pageview with Google Analytics
// (this code must run only on client!)

function trackPageView({ route, forceUrl, credentials, accessToken }) {
  if (!window._gaq)
    return;

  const { email } = credentials;
  const log = new Date() + ' - ' + window.location.href;
  let url = route.url;

  if (email) {window._gaq.push(["_setCustomVar", 1, 'email', email, 2]);}
  if (log) {window._gaq.push(["_setCustomVar", 2, 'log', log, 2]);}
  window._gaq.push(['_trackPageview', url]);
}

export default trackPageView;