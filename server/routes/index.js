module.exports = (app) => {
  app.route('/api/status-codes')
    .get((req, res)=> {
      res.send(require('http').STATUS_CODES);
    });
};
