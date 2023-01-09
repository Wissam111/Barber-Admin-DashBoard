import React, { Component, useState, useContext, useRef } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import OTP from "./OTP";
import { useNavigate, useLocation } from "react-router-dom";
function PhoneLogin(props) {
  const { handleLogin, handleVerify, handleShowOTP, showOTP } = props;
  const phoneRef = useRef("");

  // const [showPhone, setShowPhone] = useState(true);
  const navigate = useNavigate();
  const [loadLogin, setLoadLogin] = useState(false);

  return (
    <div className="phonelogin-container">
      {!showOTP && (
        <div className="enterPhone-container">
          <h2 className="signin-logo">SIGN IN</h2>
          <input
            type="tel"
            placeholder="Enter Mobile Number"
            ref={phoneRef}
            required
          />
          {loadLogin && (
            <div className="circle-wrapper">{<CircularProgress />}</div>
          )}
          <button
            className="loginBtn"
            onClick={() => handleLogin(phoneRef.current.value)}
          >
            {"SUBMIT"}
          </button>
        </div>
      )}

      {showOTP && (
        <OTP
          handleBack={handleShowOTP}
          handleVerify={handleVerify}
          //   loadLogin={loadLogin}
        />
      )}
    </div>
  );
}

export default PhoneLogin;
