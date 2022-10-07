import PhoneLogin from "../LoginSection/PhoneLogin";

function Login(props) {
  return (
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
  );
}

export default Login;
