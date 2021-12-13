
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  checkUniqueEmail,
  checkUniquePhone,
  checkActivationCode,
  registration,
} from "./ActionRegCreator";

type FormPhoneType = {
  formattedValue: string;
  value: string;
};

interface AuthState {
  activityBlock: number;
  form_firstname: string;
  form_lastname: string;
  form_email: string;
  form_age: string;
  form_password: string;
  form_repassword: string;
  form_gender: string;
  form_phone: FormPhoneType;
  form_activation_code: string[];
  isLoadingRegistration: boolean;
  uniqueEmailError: string;
  uniquePhoneError: string;
  checkActivationCodeError: string;
  registrationError: string;
  registrationMsg: string;
}

const initialState: AuthState = {
  activityBlock: 0,
  form_firstname: "",
  form_lastname: "",
  form_email: "",
  form_age: "",
  form_password: "",
  form_repassword: "",
  form_gender: "another",
  form_phone: {
    formattedValue: "",
    value: "",
  },
  form_activation_code: ["", "", "", ""],
  uniqueEmailError: "",
  uniquePhoneError: "",
  checkActivationCodeError: "",
  isLoadingRegistration: false,
  registrationError: "",
  registrationMsg: "",
};

export const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    handleNextBlock(state) {
      if (state.activityBlock !== 4) {
        state.activityBlock++;
      }
    },
    handlePrevBlock(state) {
      if (state.activityBlock !== 0) {
        state.activityBlock--;
      }
    },
    handleChangeFormFirstname(state, action: PayloadAction<string>) {
      state.form_firstname = action.payload;
    },
    handleChangeFormLastname(state, action: PayloadAction<string>) {
      state.form_lastname = action.payload;
    },
    handleChangeFormEmail(state, action: PayloadAction<string>) {
      state.form_email = action.payload;
    },
    handleChangeFormAge(state, action: PayloadAction<string>) {
      state.form_age = action.payload;
    },
    handleChangeFormPassword(state, action: PayloadAction<string>) {
      state.form_password = action.payload;
    },
    handleChangeFormRepassword(state, action: PayloadAction<string>) {
      state.form_repassword = action.payload;
    },
    handleChangeFormGender(state, action: PayloadAction<string>) {
      state.form_gender = action.payload;
    },
    handleChangeFormPhone(state, action: PayloadAction<FormPhoneType>) {
      state.form_phone = action.payload;
    },
    handleChangeFormActivationCode(state, action: PayloadAction<string[]>) {
      state.form_activation_code = action.payload;
    },
    handleSetEmptyUniqueEmailMsg(state) {
      state.uniqueEmailError = "";
    },
    handleSetEmptyUniquePhoneMsg(state) {
      state.uniquePhoneError = "";
    },
    handleSetEmptyCheckActivationCodeError(state) {
      state.checkActivationCodeError = "";
    },
  },
  extraReducers: {
    //checkuniqueemail
    [checkUniqueEmail.fulfilled.type]: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isLoadingRegistration = false;

      if (action.payload) {
        state.uniqueEmailError = "";
        state.activityBlock += 1;
      } else {
        state.uniqueEmailError = `${state.form_email} уже существует`;
      }
    },
    [checkUniqueEmail.pending.type]: (state) => {
      state.isLoadingRegistration = true;
    },
    [checkUniqueEmail.rejected.type]: (state) => {
      state.isLoadingRegistration = false;
      state.uniqueEmailError = "Что-то пошло не так";
    },
    //checkuniquephone
    [checkUniquePhone.fulfilled.type]: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isLoadingRegistration = false;
      
      if (action.payload) {
        state.uniquePhoneError = "";
        state.activityBlock += 1;
      } else {
        state.uniquePhoneError = `${state.form_phone.value} уже существует`;
      }
    },
    [checkUniquePhone.pending.type]: (state) => {
      state.isLoadingRegistration = true;
    },
    [checkUniquePhone.rejected.type]: (state) => {
      state.isLoadingRegistration = false;
      state.uniquePhoneError = "Что-то пошло не так";
    },

    //checkactivationcode
    [checkActivationCode.fulfilled.type]: (state) => {
      state.isLoadingRegistration = false;
      state.activityBlock += 1;
    },
    [checkActivationCode.pending.type]: (state) => {
      state.isLoadingRegistration = true;
    },
    [checkActivationCode.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingRegistration = false;
      state.checkActivationCodeError = action.payload;
    },
    //registration
    [registration.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRegistration = false;
      state.registrationError = "";
      state.registrationMsg = action.payload;
    },
    [registration.pending.type]: (state) => {
      state.isLoadingRegistration = true;
    },
    [registration.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRegistration = false;
      state.registrationError = action.payload;
    },
  },
});

export default registrationSlice.reducer;
