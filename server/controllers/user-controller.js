
const userService = require("../services/user-service");
const { validationResult } = require("express-validator");

const ApiError = require("../exceptions/api-errors");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Ошибка валидации", errors.array()));
      }
      const { email, password, firstname, lastname, age, gender, phone } =
        req.body;
      const userData = await userService.registration(
        email,
        password,
        firstname,
        lastname,
        age,
        gender,
        phone
      );
      return res.json("Вы успешно зарегистрированы");
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      const response = await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }

  async forgot(req, res, next) {
    // линка ресета на почту
    // Отправка линки на ресет
    try {
      const email = req.body.email;
      await userService.forgot(email);
      return res.json("Ссылка на сброс пароля отправлена на почту");
    } catch (e) {
      next(e);
    }
  }

  async checkResetLink(req, res, next) {
    // проверка линки + клиент
    try {
      const resetPasswordToken = req.params.resetPasswordToken;

      const userData = await userService.checkResetLink(resetPasswordToken);

      return res.json("Ссылка на сброс пароля действительна");
    } catch (e) {
      next(e);
    }
  }

  async updatePassword(req, res, next) {
    // сам ресет пароля
    try {
      const newPassword = req.body.password;
      const resetPasswordToken = req.body.resetPasswordToken;
      const userData = await userService.updatePassword(
        newPassword,
        resetPasswordToken
      );
      return res.json("Пароль успешно изменен");
    } catch (e) {
      next(e);
    }
  }

  async sendActivationLink(req, res, next) {
    try {
      const userOfRequest = req.user;
      const sendedLink = await userService.sendActivationLink(userOfRequest);
      return res.json("Ссылка активацию аккаунта отправлена на почту");
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      const userData = await userService.refresh(refreshToken);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  //AUTH-TOOLS
  async checkUniqueEmail(req, res, next) {
    try {
      const { email } = req.body;
      const check = await userService.checkUniqueEmail(email);
      return res.json(check);
    } catch (e) {
      next(e);
    }
  }

  async checkUniquePhone(req, res, next) {
    try {
      const { phone } = req.body;
      const check = await userService.checkUniquePhone(phone);
      return res.json(check);
    } catch (e) {
      next(e);
    }
  }

  async sendActivationCode(req, res, next) {
    try {
      const { phone } = req.body;
      const codeResponse = await userService.sendActivationCode(phone);
      return res.json(codeResponse);
    } catch (e) {
      next(e);
    }
  }

  async checkActivationCode(req, res, next) {
    try {
      const { phone, code } = req.body;
      const checkResponse = await userService.checkActivationCode(phone, code);
      return res.json(checkResponse);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
