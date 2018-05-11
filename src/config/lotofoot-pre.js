export default {
  appEnv: 'dev',
  appLabel: 'Lotofoot.io',
  appTitle: 'Lotofoot.io | Pronostiquez entre amis',
  appDescription: 'Pronostiquez entre amis sur les matchs de la coupe du monde 2018',
  appUri: 'https://staging.lotofoot.io',
  cookie: 'lotofoot_token',

  apiUri: process.env.API_URI || 'https://lotofoot-api-dev.herokuapp.com/api',
  appName: process.env.APP_NAME,
  trackingId: process.env.TRACKING_ID,
};