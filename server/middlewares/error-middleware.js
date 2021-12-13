const ApiError = require('../exceptions/api-errors');
// для обработки ошибок, пока идет запрос от клиента к серверу,он проходит черед мидлвееры и уже потом отдайется от сервера респонс
module.exports = function (err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: 'Непредвиденная ошибка ' });
};
