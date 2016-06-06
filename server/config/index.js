module.exports = {
  isProduction: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  database: process.env.MONGODB_URL || 'mongodb://localhost:27017/standort'
};
