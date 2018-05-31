export default {
  appEnv: 'prod',
  appLabel: 'Lotofoot.io',
  appTitle: 'Lotofoot.io | Pronostiquez entre amis',
  appDescription: 'Pronostiquez entre amis sur les matchs de la coupe du monde 2018',
  appUri: 'https://www.lotofoot.io',
  cookie: 'lotofoot_token',
  language: 'fr',

  apiUri: process.env.API_URI || 'https://lotofoot-api.herokuapp.com/api',
  appName: process.env.APP_NAME,
  trackingId: 'UA-45826787-6',
};