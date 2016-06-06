module.exports = {
  isDevelopment: !process.env.NODE_ENV ||
    process.env.NODE_ENV === 'development',
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  database: process.env.MONGODB_URL || 'mongodb://localhost:27017/standort'
};
