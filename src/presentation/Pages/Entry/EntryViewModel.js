import { useEffect, useState } from "react";
import AuthRepository from "../../../repository/AuthRepository";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const EntryViewModel = () => {
  const authRepository = AuthRepository();
  const [showOTP, setShowOTP] = useState(false);
  const [verify, setVerify] = useState({});
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const handleLogin = async (phone) => {
    console.log(phone);
    try {
      const { status, data } = await authRepository.login(phone);
      setVerify({ verifyId: data.verifyId, phone, code: "" });
      if (status == 201) {
        setShowOTP(true);
      }

      console.log(data);
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };
  const handleVerify = async (event, inputsCode) => {
    event.preventDefault();
    let subCode = inputsCode.reduce((a, b) => a + b.value, "");
    verify.code = subCode;
    try {
      const { status, data } = await authRepository.verifyLogin(verify);
      if (status == 200) {
        localStorage.setItem("authData", JSON.stringify(data.authData));
        dispatch({ type: "LOGIN", payload: data.authData });
        navigate("/home", { replace: true });
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowOTP = () => {
    setShowOTP(!showOTP);
  };

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    if (authData) {
      navigate("/", { replace: true });
    }
  }, []);

  return { handleLogin, handleVerify, handleShowOTP, showOTP };
};

export default EntryViewModel;
