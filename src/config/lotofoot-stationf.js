export default {
  appEnv: 'prod',
  appLabel: 'Station Foot',
  appTitle: 'Station Foot | Station F’s prediction contest',
  appDescription: 'Whether you’re a soccer expert or a complete newbie, join StationFoot, Station F’s prediction contest and win goodies!',
  appUri: 'https://stationf.lotofoot.io',
  cookie: 'lotofoot_token',
  language: 'en',

  apiUri: process.env.API_URI || 'https://lotofoot-stationf-api.herokuapp.com/api',
  appName: process.env.APP_NAME,
  trackingId: 'UA-45826787-6',
};