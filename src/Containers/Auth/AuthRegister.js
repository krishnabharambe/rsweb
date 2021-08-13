import React from "react";
import ValidatePhone from "../../Components/Auth/ValidatePhone";
import { useSelector } from "react-redux";
import ValidateOtp from "../../Components/Auth/ValidateOtp";
import Register from "../../Components/Auth/Register";
import Login from "../../Components/Auth/Login";
// import { Container } from './styles';

function AuthRegister() {
  const state = useSelector((state) => state);
  return (
    <div>
      {state.isPhoneOTPSent ? (
        <div>
          {state.isOtpValidated ? (
            <div>{state.isRegComplete ? <Login /> : <Register />}</div>
          ) : (
            <ValidateOtp />
          )}
        </div>
      ) : (
        <ValidatePhone />
      )}
    </div>
  );
}

export default AuthRegister;
