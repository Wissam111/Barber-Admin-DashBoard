import { useState, useEffect } from "react";
import UserRepository from "../../../repository/UserRepository";
import { useLoadingContext } from "../../../hooks/useLoadingContext";
import moment from "moment/moment";

const UsersViewModel = () => {
  const [users, setUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [currUser, setCurrUser] = useState({});
  const { setLoading } = useLoadingContext();
  const [refreshKey, setRefreshKey] = useState(0);

  const userRepository = UserRepository();

  const getUsers = async () => {
    try {
      const { data } = await userRepository.getUsers();
      setUsers(data.users);
      setSearchedUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (userId) => {
    let objInfo;
    try {
      const { status, data } = await userRepository.deleteUser(userId);
      objInfo = status;
    } catch (error) {
      console.log(error);
      objInfo = error.message;
    }
    return objInfo;
  };
  const createUser = async (userObj) => {
    let objInfo;
    try {
      const { status, data } = await userRepository.createUser(userObj);
      console.log(status);
      console.log(data);
      objInfo = status;
    } catch (error) {
      console.log(error);
      objInfo = error.message;
    }
    return objInfo;
  };
  const updateUser = async (userId, userObj) => {
    let objInfo;
    try {
      const { status, data } = await userRepository.updateUser(userId, userObj);

      objInfo = status;
    } catch (error) {
      console.log(error);
      objInfo = error.message;
    }
    return objInfo;
  };

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
    setShowSettings(true);
    setCurrUser(customer);
  };

  const handleExitSettings = () => {
    setShowSettings(false);
  };

  const handleDeleteUser = async (customerId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      let status = await deleteUser(customerId);
      if (status === 200) {
        window.alert("User deleted successfully");
      } else {
        window.alert(status);
      }
      handleExitSettings();
    }
    refresh();
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

    let status = await createUser(userObj);
    if (status === 201) {
      window.alert("User created successfully");
    } else {
      window.alert(status);
    }
    refresh();
  };
  const refresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    const UsersInit = async () => {
      setLoading(true);
      await getUsers();
      setLoading(false);
    };
    UsersInit();
  }, [refreshKey]);

  return {
    users,
    setUsers,
    searchedUsers,
    setSearchedUsers,
    showSettings,
    setShowSettings,
    currUser,
    setCurrUser,
    handleSubmit,
    handleDeleteUser,
    handleChange,
    handleSettings,
    updateUser,
    refresh,
    // uploadImage,
  };
};
export default UsersViewModel;
