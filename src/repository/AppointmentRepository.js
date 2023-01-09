import { useApiContext } from "../hooks/useApiContext";

const AppointmentRepository = () => {
  const { apiCall } = useApiContext();

  const getAppointments = () => {
    const data = apiCall("appointments");
    return data;
  };

  const deleteAppointment = (appointId) => {
    const data = apiCall(`appointments/${appointId}`, "DELETE");
    return data;
  };

  const createAppointment = (appoint) => {
    const data = apiCall(`appointments`, "POST", appoint);
    return data;
  };
  const updateStatus = (appoint) => {
    const data = apiCall(`appointments/update-status`, "PATCH", appoint);
    return data;
  };

  return {
    getAppointments,
    updateStatus,
    createAppointment,
    deleteAppointment,
  };
};

export default AppointmentRepository;
