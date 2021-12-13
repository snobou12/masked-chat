const ApiError = require('../exceptions/api-errors');
const TokenService = require('../services/token-service');
module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnathorizedError());
    }
    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnathorizedError());
    }
    const userData = TokenService.validateAccessToken(accessToken);

    if (!userData) {
      return next(ApiError.UnathorizedError());
    }
    req.user = userData; // помещаем данные о пользователе для получения роли и тп штуке !!!!!!!!!!
    next(); // передаем дальше мидлвееру
  } catch (e) {
    return next(ApiError.UnathorizedError());
  }
};
