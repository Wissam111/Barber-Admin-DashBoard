import { useApiContext } from "../hooks/useApiContext";
import axios from "axios";
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
  const createUser = (userObj) => {
    const data = apiCall(`signup`, "POST", userObj);
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

  const uploadImage = async (selectedFile) => {
    let formData = new FormData();

    formData.append("name", selectedFile.data.name);
    formData.append("image", selectedFile.data);
    // formData.append("image", {
    //   uri: selectedFile.data,
    //   name: selectedFile.data.name,
    //   type: selectedFile.type,
    // });
    const data = await axios.post(
      "http://ec2-13-231-177-94.ap-northeast-1.compute.amazonaws.com/api/upload-img",
      formData
    );
    return data;
  };

  return {
    getUsers,
    deleteUser,
    updateUser,
    getWorkers,
    createUser,
    uploadImage,
  };
};

export default UserRepository;
