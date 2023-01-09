import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
function NavBar() {
  const [activeNav, setActiveNav] = useState(0);
  const { authData, dispatch } = useAuthContext();
  return (
    <div className="navbar-container">
      {/* <img
        className="userLogo"
        src={require("../../../assets/imgs/prof2.jpg")}
      /> */}
      {/* <Image imageId={restaurant?.image} classN="userLogo" /> */}
      <ul className="nav-links">
        <li className={activeNav == 0 && "active"}>
          <Link to="/home" className="nav-link" onClick={() => setActiveNav(0)}>
            <img src={require("../../assets/imgs/barber-shop-icon.png")} />
          </Link>
        </li>

        <li className={activeNav == 1 && "active"}>
          <Link
            to="/agenda"
            className="nav-link"
            onClick={() => setActiveNav(1)}
          >
            <img src={require("../../assets/icons/calendar.png")} />
          </Link>
        </li>
        <li className={activeNav == 2 && "active"}>
          <Link
            to="/staff"
            className="nav-link"
            onClick={() => setActiveNav(2)}
          >
            <img src={require("../../assets/icons/employee.png")} />
          </Link>
        </li>
        {/* <li>
          <Link to="/" className="nav-link">
            <img src={require("../../../assets/icons/histyoryIcon.png")} />
          </Link>
        </li> */}
        <li className={activeNav == 3 && "active"}>
          <Link
            to="/settings"
            className="nav-link"
            onClick={() => setActiveNav(3)}
          >
            <img src={require("../../assets/icons/group.png")} />
          </Link>
        </li>
      </ul>

      <div className="logout-wrapper">
        <Link to="/" className="nav-link">
          <img
            onClick={() => {
              setActiveNav(-1);
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
