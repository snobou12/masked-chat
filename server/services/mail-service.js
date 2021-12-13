const nodemailer = require('nodemailer');
class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMPT_HOST,
      port: process.env.SMPT_PORT,
      secure: false,
      auth: {
        user: process.env.SMPT_USER,
        pass: process.env.SMPT_PASSWORD,
      },
    });
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMPT_USER,
      to, // сразу параметром
      subject: 'Активация аккаунта на ' + process.env.API_URL,
      text: '',
      html: `
      <div>
        <h1> Для активации отсконируйте qr code и перейдите по ссылке  </h1>
        <a href="${link}">${link} </a>
      </div>
      `,
    });
  } // email и ссылка для подтверждения

  async sendPasswordResetLink(to, linkToken) {
    await this.transporter.sendMail({
      from: process.env.SMPT_USER,
      to,
      subject: `Сброс пароля на` + process.env.API_URL,
      text: '',
      html: `
      <div>
      <h1> Для сброса пароля перейдите по ссылке ниже </h1>
      <a href="${linkToken}"> ${linkToken} </a>
      </div>
      `,
    });
  }
}

module.exports = new MailService();
