import PhoneLogin from "../LoginSection/PhoneLogin";
import { APIContextProvider } from "../Context/apiContext";
function Login(props) {
  return (
    <APIContextProvider>
      <div className="login-container">
        <div className="innerLogin-cointainer">
          <div className="left-logo">
            <img
              className="imgLogo"
              src={require("../../imgs/barberStyle.png")}
              alt=""
            />
          </div>
          <PhoneLogin handleLogin={props.handleLogin} />
        </div>
      </div>
    </APIContextProvider>
  );
}

export default Login;
