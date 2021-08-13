import axios from "axios";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const IsAuthenticated = () => {
  return {
    type: actionTypes.isAuthenticated,
  };
};

export const validatePhoneStart = () => {
  return {
    type: actionTypes.VALIDATE_PHONE_START,
  };
};

export const validatePhoneOtpSent = () => {
  return {
    type: actionTypes.VALIDATE_PHONE_OTP_SENT,
  };
};

export const otpValidated = () => {
  return {
    type: actionTypes.OTP_VALIDATED,
  };
};

export const regComplete = () => {
  return {
    type: actionTypes.REG_COMPLETE,
  };
};

export const regFailed = () => {
  return {
    type: actionTypes.REG_FAILED,
  };
};
export const otpValidatedFailed = () => {
  return {
    type: actionTypes.OTP_VALIDATION_FAILED,
  };
};

export const authSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkifAuth = (dispatch) => {
  const token = localStorage.getItem("token");
  const phone = localStorage.getItem("Phone");
  console.log("token-", token, " Phone-", phone);

  if (token && phone) {
    axios
      .get("https://krishnabharambe.pythonanywhere.com/auth/userAPI/", {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then((res) => {
        console.log("response", res.data.phone);
        if (phone == res.data.phone) {
          dispatch(IsAuthenticated());
        }
      })
      .catch((err) => {
        console.log(err);
        return (dispatch) => {
          dispatch(authFail(err));
        };
      });
  }
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (password) => {
  return (dispatch) => {
    // dispatch(authStart());
    axios
      .post("https://krishnabharambe.pythonanywhere.com/auth/login/", {
        phone: localStorage.getItem("Phone"),
        password: password,
      })
      .then((res) => {
        const token = res.data.token;
        const expirationDate = new Date(
          new Date().getTime() + 3600 * 1000 * 180
        );
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(IsAuthenticated());
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authLogin2 = (phone, password) => {
  return (dispatch) => {
    // dispatch(authStart());
    axios
      .post("https://krishnabharambe.pythonanywhere.com/auth/login/", {
        phone: phone,
        password: password,
      })
      .then((res) => {
        const token = res.data.token;
        const expirationDate = new Date(
          new Date().getTime() + 3600 * 1000 * 180
        );
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(IsAuthenticated());
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const validate_Phone = (phone) => {
  return (dispatch) => {
    dispatch(validatePhoneStart());
    axios
      .post("https://krishnabharambe.pythonanywhere.com/auth/validate_phone/", {
        phone: phone,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("Phone", phone);
        dispatch(validatePhoneOtpSent());
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const validate_Otp = (otp) => {
  return (dispatch) => {
    // dispatch(OtpValidationStart());
    axios
      .post("https://krishnabharambe.pythonanywhere.com/auth/validate_otp/", {
        phone: localStorage.getItem("Phone"),
        otp: otp,
      })
      .then((res) => {
        console.log(res.data);
        dispatch(otpValidated());
        // dispatch(OtpValidated());
      })
      .catch((err) => {
        dispatch(otpValidatedFailed());
      });
  };
};

export const authSignup = (password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("https://krishnabharambe.pythonanywhere.com/auth/register/", {
        phone: localStorage.getItem("Phone"),
        password: password,
      })
      .then((res) => {
        dispatch(regComplete());
      })
      .catch((err) => {
        dispatch(regFailed());
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
