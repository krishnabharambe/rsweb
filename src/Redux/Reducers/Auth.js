import * as actionTypes from "../Actions/actionTypes";
import { checkifAuth } from "../Actions/Auth";
import { updateObject } from "../utility";




const initialState = {
  token: null,
  error: null,
  loading: false,
  isValidatePhoneStart: false,
  isPhoneOTPSent: false,
  isOtpValidated: false,
  isOtpValidationFailed: false,
  isRegComplete : false,
  isRegFailed : false,
  isAuthenticated : false
};

const RegComplete  = (state, action) => {
  return updateObject(state, {
    isRegComplete: true,
  });
};

const IsAuthenticated= (state, action) => {
  console.log(checkifAuth());
  return updateObject(state, {
    isAuthenticated: true,
  });
};

const RegFailed = (state, action) => {
  return updateObject(state, {
    isRegFailed: true,
  });
};

const Otp_Validation = (state, action) => {
  return updateObject(state, {
    isOtpValidated: true,
  });
};

const OtpValidationFailed = (state, action) => {
  return updateObject(state, {
    isOtpValidationFailed: true,
  });
};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const validatePhoneStart = (state, action) => {
  return updateObject(state, {
    isValidatePhoneStart: true,
  });
};

const validatePhoneOtpSent = (state, action) => {
  return updateObject(state, {
    isPhoneOTPSent: true,
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    error: null,
    loading: false,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.VALIDATE_PHONE_START:
      return validatePhoneStart(state, action);
    case actionTypes.VALIDATE_PHONE_OTP_SENT:
      return validatePhoneOtpSent(state, action);
    case actionTypes.OTP_VALIDATION_FAILED:
      return OtpValidationFailed(state, action);
    case actionTypes.OTP_VALIDATED:
      return Otp_Validation(state, action);
    case actionTypes.REG_COMPLETE:
      return RegComplete(state, action);
    case actionTypes.REG_FAILED:
      return RegFailed(state, action);
    case actionTypes.isAuthenticated:
      return IsAuthenticated(state, action)
    default:
      return state;
  }
};

export default reducer;
