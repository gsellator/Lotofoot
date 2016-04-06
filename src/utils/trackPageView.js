// Track a pageview with Google Analytics
// (this code must run only on client!)

function trackPageView(url, group, username, role, accessToken, log) {
  if (!window._gaq)
    return;

  if (group) {window._gaq.push(["_setCustomVar", 1, 'group', group, 2]);}
  if (username) {window._gaq.push(["_setCustomVar", 2, 'username', username, 2]);}
  if (role) {window._gaq.push(["_setCustomVar", 3, 'role', role, 2]);}
  if (accessToken) {window._gaq.push(["_setCustomVar", 4, 'token', accessToken, 2]);}
  if (log) {window._gaq.push(["_setCustomVar", 5, 'log', log, 2]);}
  window._gaq.push(['_trackPageview', url]);
}

export default trackPageView;