import AppointmentRepository from "../../../repository/AppointmentRepository";
import UserRepository from "../../../repository/UserRepository";
import { useState, useEffect } from "react";
import { useLoadingContext } from "../../../hooks/useLoadingContext";
import moment from "moment/moment";
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
  const [schedulerData, setSchedulerData] = useState([]);

  const appointmentRepository = AppointmentRepository();
  const userRepository = UserRepository();

  const getAppointments = async () => {
    try {
      const { data } = await appointmentRepository.getAppointments();
      // console.log(data.appointments);
      setAppointmentsData(data.appointments);
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
    let objInfo;
    try {
      const { status, data } = await appointmentRepository.createAppointment(
        appoint
      );
      console.log(data);
      objInfo = { status, data };
    } catch (error) {
      console.log(error);
      objInfo = error.message;
    }
    return objInfo;
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
    let objInfo;
    try {
      const { status, data } = await appointmentRepository.updateStatus(
        appoint
      );
      console.log(data);
      let objInfo = { status, data };
    } catch (error) {
      console.log(error);
      objInfo = error.message;
    }

    setLoading(false);
    return objInfo;
  };

  const handleStaffScheduler = (worker) => {
    const currWorkerAppoints = appointmentsData.filter((appoint) => {
      if (!appoint.worker) {
        return false;
      }
      return appoint.worker._id == worker._id;
    });
    const schData = currWorkerAppoints.map((appoint) => {
      let schAppoint = createSchAppoint(appoint);
      return schAppoint;
    });
    setCurrWorker(worker);
    setSchedulerData(schData);
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
    let _tempSchData = [...schedulerData];
    if (added) {
      let currDate = moment(added.startDate).format("yyyy-MM-DD");
      let startDate = compineDT(currDate, added.startDate);
      let endDate = compineDT(currDate, added.endDate);
      let appoint = {
        worker: currWorker._id,
        start_time: `${startDate}`,
        end_time: `${endDate}`,
      };
      let { status, data } = await createAppointment(appoint);
      if (status == 201) {
        window.alert("appointment created Successfully");
        let appointSch = createSchAppoint(data.appointment);
        _tempSchData.push(appointSch);
        setSchedulerData(_tempSchData);
      } else {
        window.alert(status);
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
    }
  };
  const handleDeleteAppoint = async (appointId) => {
    let _tempSchData = [...schedulerData];
    let status = await deleteAppoint(appointId);
    if (status == 200) {
      let newSc = _tempSchData.filter((appoint) => {
        return appoint.id != appointId;
      });
      setSchedulerData(newSc);
      window.alert("appointment deleted successfully");
    } else {
      window.alert(status);
    }
  };

  const handleUnBook = async (id, selectedServ) => {
    let objAppo = {
      appointmentId: id,
      status: "free",
    };
    let newschData = schedulerData.map((appoint) => {
      if (appoint.id == id) {
        appoint.title = "Not Booked";
        appoint.color = "orange";
      }
      return appoint;
    });

    let status = await updateStatus(objAppo);
    if (status == 201) {
      setShowAppointCard(false);
      setSchedulerData(newschData);
      window.alert("Appointment UnBooked Successfully");
    } else {
      window.alert(status);
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
    let newschData = schedulerData.map((appoint) => {
      if (appoint.id == id) {
        appoint.title = "Booked";
        appoint.color = "green";
      }

      return appoint;
    });

    let res = await updateStatus(objAppo);
    if (res.message == "appointment status updated") {
      setShowAppointCard(false);
      setSchedulerData(newschData);
      window.alert("Appointment Booked Successfully");
    } else {
      window.alert(res.message);
    }
  };

  useEffect(() => {
    const StaffInit = async () => {
      setLoading(true);
      await getAppointments();
      await getWorkers();
      setLoading(false);
    };
    StaffInit();
  }, []);

  return {
    workers,
    schedulerData,
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
  };
};

export default StaffViewModel;
