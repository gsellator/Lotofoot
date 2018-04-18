export default {
  appLabel: 'Lotofoot.io',
  appTitle: 'Lotofoot.io | Pronostiquez entre amis',
  appDescription: 'Pronostiquez entre amis sur les matchs de la coupe du monde 2018',
  cookie: 'lotofoot_token',

  //apiUri: process.env.API_URI || 'http://localhost:5000/api',
  //apiUri: process.env.API_URI || 'https://lotofoot-api-dev.herokuapp.com/api',
  apiUri: process.env.API_URI || 'https://lotofoot-api.herokuapp.com',

  appName: process.env.APP_NAME || 'lotofoot-dev',
  billing: process.env.BILLING || false,
  trackingId: process.env.TRACKING_ID || 'UA-45826787-6'
};