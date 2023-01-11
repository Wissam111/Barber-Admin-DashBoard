import { useState, useEffect } from "react";
import AppointmentRepository from "../../../repository/AppointmentRepository";
import { useLoadingContext } from "../../../hooks/useLoadingContext";
const AgendaViewModel = () => {
  const [appointementsData, setAppointmentsData] = useState([]);
  const { setLoading } = useLoadingContext();
  const [refreshKey, setRefreshKey] = useState(0);
  const appointmentRepository = AppointmentRepository();

  const getAppointments = async () => {
    try {
      const { data } = await appointmentRepository.getAppointments();
      console.log(data);
      setAppointmentsData(data.appointments);
    } catch (error) {
      console.log(error);
    }
  };
  const updateStatus = async (appoint) => {
    setLoading(true);
    try {
      const { data } = await appointmentRepository.updateStatus(appoint);
      console.log(data);
      window.alert("Appointment updated successfully");
    } catch (error) {
      console.log(error);
      window.alert(error.message);
    }
    setLoading(false);
  };
  const deleteAppoint = async (appointId) => {
    try {
      const { status, data } = await appointmentRepository.deleteAppointment(
        appointId
      );
      window.alert("Appointment deleted successfully");
    } catch (error) {
      window.alert(error.message);
    }
  };
  const refresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    const AgendaInit = async () => {
      setLoading(true);
      await getAppointments();
      setLoading(false);
    };
    AgendaInit();
  }, [refreshKey]);

  return { appointementsData, updateStatus, deleteAppoint, refresh };
};

export default AgendaViewModel;
