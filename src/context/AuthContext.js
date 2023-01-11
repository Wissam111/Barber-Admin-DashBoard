import { createContext, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { authData: action.payload };
    case "SIGNUP":
      return { authData: action.payload };
    case "LOGOUT":
      return { authData: null };
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    authData: null,
  });
  const navigate = useNavigate();
  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    if (authData) {
      navigate("/home", { replace: true });
      dispatch({ type: "LOGIN", payload: authData });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
