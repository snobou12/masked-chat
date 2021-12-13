
const UserModel = require("../models/user-model");
const CandidateModel = require("../models/candidate-model");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const ApiError = require("../exceptions/api-errors");
const { default: axios } = require("axios");

const UserDto = require("../dtos/user-dto");

const shuffle = (o) => {
  for (
    var j, x, i = o.length;
    i;
    j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
  );
  return o;
};

const random4Digit = () => {
  return shuffle("0123456789".split("")).join("").substring(0, 4);
};

const sendActivationCodeOnPhone = async (phone, code) => {
  await axios.post(
    `https://sms.ru/sms/send?api_id=9960405D-C410-95EC-CBCB-63923B965DDD&to=${phone}&msg=${code}&json=1`
  );
};

class UserService {
  async registration(email, password, firstname, lastname, age, gender, phone) {
    const candidateEmail = await UserModel.findOne({ email });
    if (candidateEmail) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }

    const candidatePhone = await UserModel.findOne({ phone });
    if (candidatePhone) {
      throw ApiError.BadRequest(
        `Пользователь с номером ${phone} уже существует`
      );
    }

    const checkActivatedPhone = await CandidateModel.findOne({ phone });
    if (checkActivatedPhone.isActivated) {
      throw ApiError.BadRequest("Что-то пошло не так, попробуйте снова");
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
      firstname,
      lastname,
      age,
      gender,
      phone,
      resetPasswordExpires: null,
      resetPasswordToken: null,
    });
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );
    checkActivatedPhone.isActivated = true;
    await checkActivatedPhone.save();
  }
  async activate(activationLink) {
    // активация ссылки
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest("Неккоректная ссылка активации");
    }
    user.isActivatedEmail = true;
    user.activationLink = "";
    await user.save();
  }

  async sendActivationLink(userOfRequest) {
    const userOfRequestDb = await UserModel.findOne({ id: userOfRequest.id });
    if (!userOfRequestDb) {
      throw ApiError.UnathorizedError();
    }
    const activationLink = uuid.v4();
    userOfRequestDb.activationLink = activationLink;
    await userOfRequestDb.save();
    await mailService.sendActivationMail(
      userOfRequestDb.email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );
  }

  async forgot(email) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("Пользователя с таким email не существует");
    }
    if (
      user.resetPasswordExpires <= Date.now() ||
      (user.resetPasswordToken === null && user.resetPasswordExpires === null)
    ) {
      const token = crypto.randomBytes(20).toString("hex");
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 1800000;
      await user.save();
      await mailService.sendPasswordResetLink(
        email,
        `${process.env.CLIENT_URL}/passwordReset/${token}`
      );
    } else {
      throw ApiError.BadRequest(
        "Письмо уже отправлено на почту и действительно 30 минут"
      );
    }
  }

  async checkResetLink(resetPasswordToken) {
    const user = await UserModel.findOne({ resetPasswordToken });

    if (!user) {
      throw ApiError.BadRequest(
        "Ссылка на сброс пароля устарела или недействительна"
      );
    }
    if (user.resetPasswordExpires <= Date.now()) {
      throw ApiError.BadRequest(
        "Ссылка на сброс пароля устарела или недействительна"
      );
    }
  }

  async updatePassword(password, resetPasswordToken) {
    const user = await UserModel.findOne({ resetPasswordToken });

    if (!user) {
      throw ApiError.BadRequest("Что-то пошло не так");
    }

    const hashPassword = await bcrypt.hash(password, 3);
    user.password = hashPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    user.save();
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest(`Пользователь с ${email} не существует`);
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnathorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);

    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnathorizedError();
    }

    const user = await UserModel.findById(userData.id);

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  //AUTH-TOOLS
  async checkUniqueEmail(email) {
    const emailCandidate = await UserModel.findOne({ email });
    if (emailCandidate) {
      return false;
    } else {
      return true;
    }
  }

  async checkUniquePhone(phone) {
    const phoneCandidate = await UserModel.findOne({ phone });
    const phoneCandidateFromCandidates = await CandidateModel.findOne({
      phone,
    });
    if (phoneCandidateFromCandidates) {
      if (phoneCandidateFromCandidates.isActivated) {
        return false;
      }
    }
    if (phoneCandidate) {
      return false;
    } else {
      return true;
    }
  }

  async sendActivationCode(phone) {
    let code = random4Digit();

    const findFullUser = await UserModel.findOne({ phone });

    if (findFullUser) {
      throw ApiError.BadRequest("Пользователь уже существует");
    }
    const findCandidateByPhone = await CandidateModel.findOne({ phone });

    if (findCandidateByPhone) {
      if (findCandidateByPhone.isActivated) {
        throw ApiError.BadRequest("Пользователь уже активирован по номеру");
      } else {
        findCandidateByPhone.code = code;
        await findCandidateByPhone.save();
      }
    } else {
      const newCandidate = await CandidateModel.create({
        phone,
        code,
      });
    }
    console.log(code);

    // sendActivationCodeOnPhone(phone,code);
    return null;
  }

  async checkActivationCode(phone, code) {
    const checkPhone = await CandidateModel.findOne({ phone });

    if (!checkPhone) {
      throw ApiError.BadRequest("Что-то пошло не так, попробуйте еще раз");
    }
    const checkCode = await CandidateModel.findOne({ phone, code });

    if (!checkCode) {
      throw ApiError.BadRequest("Неправильный активационный код");
    }
    if (checkCode.isActivated) {
      throw ApiError.BadRequest("Пользователь уже существует");
    }
  }
}

module.exports = new UserService();
