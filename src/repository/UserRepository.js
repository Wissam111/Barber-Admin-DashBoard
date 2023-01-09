import { useApiContext } from "../hooks/useApiContext";
const UserRepository = () => {
  const { apiCall } = useApiContext();

  const getUsers = () => {
    const data = apiCall("users");
    return data;
  };

  const getWorkers = () => {
    const data = apiCall("workers");
    return data;
  };

  const deleteUser = (userId) => {
    const data = apiCall(`users/${userId}`, "DELETE");
    return data;
  };
  const updateUser = (userId, userObj) => {
    const data = apiCall(`users/${userId}`, "PATCH", userObj);
    return data;
  };

  return { getUsers, deleteUser, updateUser, getWorkers };
};

export default UserRepository;
