export default {
  isProduction: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  database: process.env.MONGODB_URL
};
