import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
function NavBar() {
  const { authData, dispatch } = useAuthContext();
  return (
    <div className="navbar-container">
      <img
        src={
          authData?.user?.image
            ? `http://ec2-13-231-177-94.ap-northeast-1.compute.amazonaws.com/imgs/${authData.user.image}`
            : require("../../assets/imgs/unknown.png")
        }
        alt=""
        className="userLogo"
      />
      <ul className="nav-links">
        <li>
          <Link to="/home" className="nav-link">
            <img src={require("../../assets/imgs/barber-shop-icon.png")} />
          </Link>
        </li>

        <li>
          <Link to="/agenda" className="nav-link">
            <img src={require("../../assets/icons/calendar.png")} />
          </Link>
        </li>
        <li>
          <Link to="/staff" className="nav-link">
            <img src={require("../../assets/icons/employee.png")} />
          </Link>
        </li>
        {/* <li>
          <Link to="/" className="nav-link">
            <img src={require("../../../assets/icons/histyoryIcon.png")} />
          </Link>
        </li> */}
        <li>
          <Link to="/users" className="nav-link">
            <img src={require("../../assets/icons/group.png")} />
          </Link>
        </li>
      </ul>

      <div className="logout-wrapper">
        <Link to="/" className="nav-link">
          <img
            onClick={() => {
              localStorage.removeItem("authData");
              dispatch({ type: "LOGOUT" });
            }}
            src={require("../../assets/icons/logout.png")}
          />
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
