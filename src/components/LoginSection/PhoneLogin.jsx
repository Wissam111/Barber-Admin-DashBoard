import React, { Component, useState, useContext, useRef } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import OTP from "./OTP";
import APIContext from "../Context/apiContext";
import { useNavigate ,useLocation} from "react-router-dom";
function PhoneLogin(props) {
  const { SendAuth, VerifyAuth } = useContext(APIContext);
  const phoneRef = useRef("");
  const [showPhone, setShowPhone] = useState(true);
  const [verfObj, setVerfObj] = useState({});
  const navigate = useNavigate();
  const [loadLogin, setLoadLogin] = useState(false);
 const location = useLocation();
 const from = location.state?.from?.pathname || "/main";
  const handleSubmitPhone = async () => {
    let ph = phoneRef.current.value;

    let authObj = {
      phone: ph,
      isLogin: true,
    };
    setLoadLogin(true);
    let res = await SendAuth(authObj);
    console.log(res)
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
      setLoadLogin(false);
    }
  };

  const handleVerf = async (event, inputsCode) => {
    event.preventDefault();

    let subCode = inputsCode.reduce((a, b) => a + b.value, "");
    let veObj = verfObj;
    veObj.code = subCode;
    setVerfObj(veObj);
    setLoadLogin(true);
    let resAuth = await VerifyAuth(veObj);
    if (resAuth.status ==200) {
      setLoadLogin(false);
      let authData = resAuth.data.authData;
      props.handleLogin(authData);
      navigate(from, { replace: true });
    } else {
      window.alert(resAuth.data.message);
      setLoadLogin(false);
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
          loadLogin={loadLogin}
        />
      )}
    </div>
  );
}

export default PhoneLogin;
