import { useState } from "react";
import AppointmentRepository from "../../../repository/AppointmentRepository";
import { useLoadingContext } from "../../../hooks/useLoadingContext";
const AgendaViewModel = () => {
  const [appointementsData, setAppointmentsData] = useState([]);

  const { setLoading } = useLoadingContext();

  const appointmentRepository = AppointmentRepository();

  const getAppointments = async () => {
    try {
      const { data } = await appointmentRepository.getAppointments();
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
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    const AgendaInit = async () => {
      setLoading(true);
      await getAppointments();
      // await getRevenu();
      setLoading(false);
    };
    AgendaInit();
  }, []);

  return { appointementsData, updateStatus };
};

export default AgendaViewModel;
