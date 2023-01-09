import PhoneLogin from "../../components/PhoneLogin";
import EntryViewModel from "./EntryViewModel";
function Entry(props) {
  const { handleLogin, handleVerify, handleShowOTP, showOTP } =
    EntryViewModel();

  return (
    <div className="page-container">
      <div className=" login-container">
        <div className="innerLogin-cointainer">
          <div className="left-logo">
            <img
              className="imgLogo"
              src={require("../../../assets/imgs/barberStyle.png")}
              alt=""
            />
          </div>
          <PhoneLogin
            handleLogin={handleLogin}
            handleVerify={handleVerify}
            handleShowOTP={handleShowOTP}
            showOTP={showOTP}
          />
        </div>
      </div>
    </div>
  );
}

export default Entry;
