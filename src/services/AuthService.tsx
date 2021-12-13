
import $api from "../api";
import { AxiosResponse } from "axios";

export default class AuthService {
  static async registration(
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    age: string,
    gender: string,
    phone: string
  ): Promise<AxiosResponse> {
    return $api.post("/registration", {
      email,
      password,
      firstname,
      lastname,
      age,
      gender,
      phone,
    });
  }

  static async login(email: string, password: string): Promise<AxiosResponse> {
    return $api.post("/login", { email, password });
  }

  static async logout(): Promise<AxiosResponse> {
    return $api.post("/logout");
  }

  static async checkAuth(): Promise<AxiosResponse> {
    return $api.get("/refresh");
  }

  // static async forgot(email: string): Promise<AxiosResponse> {
  //   return $api.post('/forgot', { email });
  // }

  // static async checkResetLink(passwordResetToken: string): Promise<AxiosResponse> {
  //   return $api.get(`/checkResetLink/${passwordResetToken}`);
  // }

  // static async updatePassword(
  //   password: string,
  //   resetPasswordToken: string,
  // ): Promise<AxiosResponse> {
  //   return $api.put('/updatePassword', { password, resetPasswordToken });
  // }

  // static async sendActivationLink(): Promise<AxiosResponse> {
  //   return $api.post('/sendActivationLink');
  // }

  //AUTH-TOOLS
  static async checkUniqueEmail(email: string): Promise<AxiosResponse> {
    return $api.post("/checkUniqueEmail", { email });
  }
  static async checkUniquePhone(phone: string): Promise<AxiosResponse> {
    return $api.post("/checkUniquePhone", { phone });
  }
  static async sendActivationCode(phone: string): Promise<AxiosResponse> {
    return $api.post("/sendActivationCode", { phone });
  }

  static async checkActivationCode(
    phone: string,
    code: string
  ): Promise<AxiosResponse> {
    return $api.post("/checkActivationCode", { phone, code });
  }
}
