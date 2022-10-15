import { useState, useContext } from "react";
import Customers from "../CustomerSection/Customers";
import RegisterForm from "../CustomerSection/RegisterForm";
import CircularProgress from "@mui/material/CircularProgress";
import APIContext from "../Context/apiContext";
import moment from "moment/moment";
import Settings from "../SettingsSection/Settings";
function Users(props) {
  const { users, setUsers } = useContext(APIContext);
  const [searchedUsers, setSearchedUsers] = useState(users);

  const [showSettings, setShowSettings] = useState(false);
  const [currUser, setCurrUser] = useState({});

  if (props.loading) return <CircularProgress />;
  const handleChange = (event) => {
    let temp = [...users];
    let tempSearched = temp.filter((user) => {
      return (
        user.phone.includes(event.target.value) ||
        user.firstName.toLowerCase().includes(event.target.value.toLowerCase())
      );
    });

    setSearchedUsers(tempSearched);
  };
  const handleSettings = (customer) => {
    console.log("hhh");
    setShowSettings(true);
    setCurrUser(customer);
  };

  const handleExitSettings = () => {
    setShowSettings(false);
  };

  const handleDeleteUser = async (customerId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      let tempUsers = users.filter((user) => {
        return user._id != customerId;
      });
      setUsers(tempUsers);
      setSearchedUsers(tempUsers);
      let res = await props.DeleteUser(customerId);
      window.alert(res.message);
      handleExitSettings();
    }
  };
  const handleSubmit = async (event, customerChecked) => {
    event.preventDefault();
    let fName = event.target[0].value;
    let lName = event.target[1].value;
    let phone = event.target[2].value;
    let birthDate = moment(event.target[3].value).format("yyyy-MM-DD");
    let userObj = {
      phone: phone,
      firstName: fName,
      lastName: lName,
      birthDate: birthDate,
      role: customerChecked ? "customer" : "barber",
    };

    let mess = await props.CreateUser(userObj);
    if (mess == "user created successfully") {
      let tempUsers = [...users];
      tempUsers.push(userObj);
      setUsers(tempUsers);
    } else {
      window.alert(mess);
    }
  };
  return (
    <div className="users-container">
      <div className="users-cta">
        <div className="staff-logo">
          <h2>Users</h2>
          <i className="fa-solid fa-users"></i>
        </div>
        <div className="search-container">
          <input type="text" placeholder="search" onChange={handleChange} />
        </div>
        <Customers
          users={searchedUsers}
          handleDeleteUser={handleDeleteUser}
          handleSettings={handleSettings}
        />
      </div>
      <RegisterForm handleSubmit={handleSubmit} />
      {showSettings && (
        <div className="settingsWrapper">
          <Settings
            handleExitSettings={() => setShowSettings(false)}
            user={currUser}
            handleDeleteUser={handleDeleteUser}
          />
        </div>
      )}
    </div>
  );
}

export default Users;
