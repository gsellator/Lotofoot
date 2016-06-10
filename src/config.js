export default {
  appName: process.env.APP_NAME || 'lotofoot-dev',
//  apiUri: process.env.API_URI || 'http://localhost:5000/api',
  apiUri: process.env.API_URI || 'https://lotofoot-api-dev.herokuapp.com/api',
  trackingId: process.env.TRACKING_ID || undefined,
  billing: process.env.BILLING || false,
  trackingId: process.env.TRACKING_ID || 'UA-45826787-6'
}