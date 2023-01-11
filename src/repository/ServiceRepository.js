import { useApiContext } from "../hooks/useApiContext";
const ServiceRepository = () => {
  const { apiCall } = useApiContext();

  const addService = (servObj) => {
    const data = apiCall("workers/services", "POST", servObj);
    return data;
  };

  const deleteService = (servId) => {
    const data = apiCall(`workers/services/${servId}`, "DELETE");
    return data;
  };

  return { addService, deleteService };
};

export default ServiceRepository;
