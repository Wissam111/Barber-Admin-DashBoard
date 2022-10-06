import { useState, useContext } from "react";
import Customers from "../CustomerSection/Customers";
import RegisterForm from "../CustomerSection/RegisterForm";
import CircularProgress from "@mui/material/CircularProgress";
import APIContext from "../Context/apiContext";
import moment from "moment/moment";
function Users(props) {
  // const [users, setUsers] = useState(props.users);
  // const [infoUser, setInfoUser] = useState({});
  const { users, setUsers } = useContext(APIContext);
  if (props.loading) return <CircularProgress />;
  const handleChange = (event) => {
    let temp = [...props.users];
    let tempSearched = temp.filter((user) => {
      return (
        user.phone.includes(event.target.value) ||
        user.firstName.toLowerCase().includes(event.target.value.toLowerCase())
      );
    });

    setUsers(tempSearched);
  };
  // const handleMoreInfo = (customer) => {
  //   setInfoUser(customer);
  // };
  const handleDeleteUser = (customerId) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      let tempUsers = users.filter((user) => {
        return user._id != customerId;
      });
      setUsers(tempUsers);
      // window.alert("user Deleted");
      props.DeleteUser(customerId);
    }
  };
  const handleSubmit = async (event, customerChecked) => {
    event.preventDefault();
    let fName = event.target[0].value;
    let lName = event.target[1].value;
    let phone = event.target[2].value;
    let birthDate = moment(event.target[3].value).format("yyyy-MM-DD");
    let workerService = event.target[6].value;
    let userObj = {
      phone: phone,
      firstName: fName,
      lastName: lName,
      birthDate: birthDate,
      role: customerChecked ? "customer" : "barber",
    };

    let mess = await props.CreateUser(userObj);
    if (mess == "signup sucess") {
      let tempUsers = [...users];
      tempUsers.push(userObj);
      setUsers(tempUsers);
    }
    window.alert(mess);
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
          users={users}
          // showUserInfo={true}
          handleDeleteUser={handleDeleteUser}
        />
      </div>
      <RegisterForm handleSubmit={handleSubmit} />
      {/* <div className="customerInfo-container">
        <UserInfoView user={infoUser} dateFormat={props.dateFormat} />
      </div> */}
    </div>
  );
}

export default Users;
