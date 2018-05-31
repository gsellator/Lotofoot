export default {
  appEnv: 'prod',
  appLabel: 'Lotofoot.io',
  appTitle: 'Lotofoot.io by Daily d\'initiés',
  appDescription: 'Que vous soyez un expert du foot ou un parfait débutant, rejoignez le Lotofoot, le concours de pronostiques de Daily d\'initiés',
  appUri: 'https://daily.lotofoot.io',
  cookie: 'lotofoot_token',
  language: 'fr',

  apiUri: process.env.API_URI || 'https://lotofoot-daily-api.herokuapp.com/api',
  appName: process.env.APP_NAME,
  trackingId: 'UA-45826787-6',
};