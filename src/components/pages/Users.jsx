import { useState } from "react";
import Customers from "../CustomerSection/Customers";
import UserInfoView from "../CustomerSection/UserInfoView";
function Users(props) {
  const [searchedUsers, setSearchedUsersUsers] = useState(props.users);
  const [infoUser, setInfoUser] = useState({});

  const handleChange = (event) => {
    let temp = [...props.users];
    let tempSearched = temp.filter((user) => {
      return (
        user.phone.includes(event.target.value) ||
        user.firstName.toLowerCase().includes(event.target.value.toLowerCase())
      );
    });

    setSearchedUsersUsers(tempSearched);
  };
  const handleMoreInfo = (customer) => {
    setInfoUser(customer);
  };
  return (
    <div className="users-container">
      <div className="staff-logo">
        <h2>Users</h2>
        <i className="fa-solid fa-users"></i>
      </div>
      <div className="users-cta">
        <div className="search-container">
          <input type="text" placeholder="search" onChange={handleChange} />
        </div>
        <Customers
          users={searchedUsers}
          showUserInfo={true}
          handleMoreInfo={handleMoreInfo}
        />
      </div>
      <div className="customerInfo-container">
        <UserInfoView user={infoUser} />
      </div>
    </div>
  );
}

export default Users;
