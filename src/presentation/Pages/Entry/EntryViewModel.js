import { useEffect, useState } from "react";
import AuthRepository from "../../../repository/AuthRepository";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useLoadingContext } from "../../../hooks/useLoadingContext";

const EntryViewModel = () => {
  const authRepository = AuthRepository();
  const [showOTP, setShowOTP] = useState(false);
  const [verify, setVerify] = useState({});
  const { dispatch } = useAuthContext();
  const { setLoading } = useLoadingContext();

  const navigate = useNavigate();

  const handleLogin = async (phone) => {
    setLoading(true);
    try {
      const { status, data } = await authRepository.login(phone);
      setVerify({ verifyId: data.verifyId, phone, code: "" });
      if (status == 201) {
        setShowOTP(true);
      }

      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };
  const handleVerify = async (event, inputsCode) => {
    setLoading(true);
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
    setLoading(false);
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
