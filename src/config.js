export default {
  appName: process.env.APP_NAME || 'lotofoot-dev',
  apiUri: process.env.API_URI || 'https://lotofoot-api-dev.herokuapp.com/api',
  trackingId: process.env.TRACKING_ID || undefined,
  billing: process.env.BILLING || false
}