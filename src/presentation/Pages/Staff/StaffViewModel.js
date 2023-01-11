import AppointmentRepository from "../../../repository/AppointmentRepository";
import UserRepository from "../../../repository/UserRepository";
import { useState, useEffect } from "react";
import { useLoadingContext } from "../../../hooks/useLoadingContext";
import moment from "moment/moment";
import ServiceRepository from "../../../repository/ServiceRepository";

const StaffViewModel = () => {
  const [workers, setWorkers] = useState([]);
  const [currWorker, setCurrWorker] = useState({});
  const [showSettings, setShowSettings] = useState(false);
  const [workerSetting, setWorkerSettings] = useState({});
  const [showAppointCard, setShowAppointCard] = useState(false);
  const [currAppoint, setCurrAppoint] = useState({});
  const [isBooked, setIsBooked] = useState(false);
  const [appointmentsData, setAppointmentsData] = useState([]);
  const { setLoading } = useLoadingContext();
  const [workerAppointments, setWorkerAppointments] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [refreshAppointsKey, setRefreshAppointsKey] = useState(0);

  const appointmentRepository = AppointmentRepository();
  const userRepository = UserRepository();
  const serviceRepository = ServiceRepository();

  const getAppointments = async () => {
    try {
      const { data } = await appointmentRepository.getAppointments();
      setAppointmentsData(data.appointments);
      return data.appointments;
    } catch (error) {
      console.log(error);
    }
  };
  const getWorkers = async () => {
    try {
      const { data } = await userRepository.getWorkers();
      console.log(data);
      setWorkers(data.workers);
    } catch (error) {
      console.log(error);
    }
  };

  const createAppointment = async (appoint) => {
    try {
      const { status, data } = await appointmentRepository.createAppointment(
        appoint
      );

      return { status, data };
    } catch (error) {
      window.alert(error.message);
    }
  };
  const deleteUser = async (userId) => {
    let objInfo;
    try {
      const { status, data } = await userRepository.deleteUser(userId);
      console.log(data);
      objInfo = status;
    } catch (error) {
      objInfo = error.message;
    }
    return objInfo;
  };

  const deleteAppoint = async (appointId) => {
    let objInfo;
    try {
      const { status, data } = await appointmentRepository.deleteAppointment(
        appointId
      );
      console.log(data);
      objInfo = status;
    } catch (error) {
      objInfo = error.message;
    }
    return objInfo;
  };

  const updateStatus = async (appoint) => {
    setLoading(true);
    try {
      const { status, data } = await appointmentRepository.updateStatus(
        appoint
      );

      return { status, data };
    } catch (error) {
      console.log(error);
      window.alert(error.message);
    }

    setLoading(false);
  };

  const addService = async (servObj) => {
    try {
      const { data } = await serviceRepository.addService(servObj);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteService = async (servId) => {
    try {
      const { data } = await serviceRepository.deleteService(servId);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
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
    refresh();
    return objInfo;
  };

  const handleStaffScheduler = (worker) => {
    setCurrWorker(worker);
    filterDataByWorker(worker, appointmentsData);
  };

  const filterDataByWorker = (worker, appoints) => {
    const currWorkerAppoints = appoints.filter((appoint) => {
      if (!appoint.worker) {
        return false;
      }
      return appoint.worker._id == worker._id;
    });
    const schData = currWorkerAppoints.map((appoint) => {
      let schAppoint = createSchAppoint(appoint);
      return schAppoint;
    });
    setWorkerAppointments(schData);
  };

  const createSchAppoint = (appoint) => {
    let isBooked = !(appoint.status == "free" || appoint.status == "canceled");
    let _appoint = {
      id: appoint._id,
      startDate: appoint.start_time,
      endDate: appoint.end_time,
      title: isBooked ? "Booked" : "Not Booked",
      color: isBooked ? "green" : "orange",
    };
    return _appoint;
  };

  const compineDT = (date, time) => {
    let d = moment(date).format("yyyy-MM-DD");
    let t = moment(time).format("HH:mm");
    return moment(d + " " + t);
  };

  const commitChanges = async ({ added, changed, deleted }) => {
    if (added) {
      let currDate = moment(added.startDate).format("yyyy-MM-DD");
      let startDate = compineDT(currDate, added.startDate);
      let endDate = compineDT(currDate, added.endDate);
      let appoint = {
        worker: currWorker._id,
        start_time: `${startDate}`,
        end_time: `${endDate}`,
      };
      const { status, data } = await createAppointment(appoint);
      if (status == 201) {
        window.alert("appointment created successfully");
        refreshAppointments();
      }
    }
    if (deleted != null) {
      handleDeleteAppoint(deleted);
    }
  };
  const handleSettings = async (worker) => {
    setShowSettings(!showSettings);
    setWorkerSettings(worker);
  };
  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      let res = await deleteUser(userId);
      window.alert(res.message);
      setShowSettings(false);
      refresh();
    }
  };
  const handleDeleteAppoint = async (appointId) => {
    let status = await deleteAppoint(appointId);
    if (status == 200) {
      window.alert("appointment deleted successfully");
      refreshAppointments();
    } else {
      window.alert(status);
    }
  };

  const handleUnBook = async (id, selectedServ) => {
    let objAppo = {
      appointmentId: id,
      status: "free",
    };

    let { status } = await updateStatus(objAppo);
    if (status == 200) {
      setShowAppointCard(false);
      window.alert("Appointment UnBooked Successfully");
      refreshAppointments();
    }
  };
  const handleBook = async (id, selectedServ) => {
    if (selectedServ == "") {
      window.alert("No Service Selected!");
      return;
    }

    let objAppo = {
      appointmentId: id,
      status: "hold",
      service: selectedServ,
    };
    const { status, data } = await updateStatus(objAppo);
    console.log(status);
    if (status == 200) {
      setShowAppointCard(false);
      window.alert("Appointment Booked Successfully");
      refreshAppointments();
    }
  };
  const refresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };
  const refreshAppointments = () => {
    setRefreshAppointsKey((prevKey) => prevKey + 1);
  };
  useEffect(() => {
    const StaffInit = async () => {
      setLoading(true);
      await getWorkers();
      await getAppointments();
      setLoading(false);
    };
    StaffInit();
  }, [refreshKey]);
  useEffect(() => {
    const AppointsRefreshInit = async () => {
      setLoading(true);
      const appoints = await getAppointments();
      filterDataByWorker(currWorker, appoints);
      setLoading(false);
    };
    AppointsRefreshInit();
  }, [refreshAppointsKey]);

  return {
    workers,
    workerAppointments,
    appointmentsData,
    handleStaffScheduler,
    currWorker,
    showSettings,
    workerSetting,
    showAppointCard,
    currAppoint,
    isBooked,
    setShowAppointCard,
    setIsBooked,
    setShowSettings,
    setCurrAppoint,
    handleBook,
    handleUnBook,
    handleDeleteUser,
    commitChanges,
    handleSettings,
    addService,
    deleteService,
    updateUser,
    refresh,
  };
};

export default StaffViewModel;
