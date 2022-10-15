import React, { Component, useState, useContext, useRef } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import OTP from "./OTP";
import APIContext from "../Context/apiContext";
import { useNavigate } from "react-router-dom";
function PhoneLogin(props) {
  const { SendAuth, VerifyAuth } = useContext(APIContext);
  const phoneRef = useRef("");
  const [showPhone, setShowPhone] = useState(true);
  const [verfObj, setVerfObj] = useState({});
  const navigate = useNavigate();
  const [loadLogin, setLoadLogin] = useState(false);
  const handleSubmitPhone = async () => {
    let ph = phoneRef.current.value;
    console.log(ph);
    let authObj = {
      phone: ph,
      isLogin: true,
    };
    setLoadLogin(true);
    let res = await SendAuth(authObj);
    let code = "1234";
    if (res.message == "verification sent") {
      setLoadLogin(false);
      setVerfObj({
        phone: ph,
        verifyId: res.verifyId,
        code: code,
      });
      setShowPhone(false);
    } else {
      window.alert(res.message);
    }
  };

  const handleVerf = async (event) => {
    event.preventDefault();
    let subCode =
      event.target[0].value +
      event.target[1].value +
      event.target[2].value +
      event.target[3].value;
    let veObj = verfObj;
    veObj.code = subCode;
    setVerfObj(veObj);
    setLoadLogin(true);
    let resAuth = await VerifyAuth(veObj);
    if (resAuth.message == "login sucess") {
      setLoadLogin(false);
      props.handleLogin();
      navigate("/main");
    } else {
      window.alert(resAuth.message);
    }
  };
  return (
    <div className="phonelogin-container">
      {showPhone && (
        <div className="enterPhone-container">
          <h2 className="signin-logo">SIGN IN</h2>
          <input
            type="tel"
            placeholder="Enter Mobile Number"
            ref={phoneRef}
            required
          />
          {loadLogin && (
            <div className="circle-wrapper">
              <CircularProgress />
            </div>
          )}
          <button className="loginBtn" onClick={handleSubmitPhone}>
            {"SUBMIT"}
          </button>
        </div>
      )}

      {!showPhone && (
        <OTP
          handleBack={() => setShowPhone(!showPhone)}
          handleVerf={handleVerf}
        />
      )}
    </div>
  );
}

export default PhoneLogin;
