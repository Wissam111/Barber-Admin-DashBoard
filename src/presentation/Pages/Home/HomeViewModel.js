import { useEffect, useState } from "react";
import AppointmentRepository from "../../../repository/AppointmentRepository";
import UserRepository from "../../../repository/UserRepository";
import DashboardRepository from "../../../repository/DashboardRepository";
import { useLoadingContext } from "../../../hooks/useLoadingContext";
import moment from "moment";
import { useAuthContext } from "../../../hooks/useAuthContext";

const HomeViewModel = () => {
  const [date, setDate] = useState(new Date());
  const [done, setDone] = useState(0);
  const [pending, setPending] = useState(0);
  const [canceled, setCanceled] = useState(0);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState([]);
  const [doneDealsData, setDoneDealsData] = useState([]);
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [profitData, setProfitData] = useState([]);
  const { setLoading } = useLoadingContext();
  const { authData } = useAuthContext();
  const [refreshKey, setRefreshKey] = useState(0);
  const appointmentRepository = AppointmentRepository();
  const userRepository = UserRepository();
  const dashboardRepository = DashboardRepository();
  const getAppointments = async () => {
    try {
      const { data } = await appointmentRepository.getAppointments();
      setAppointmentsData(data.appointments);
    } catch (error) {
      console.log(error);
    }
  };
  const getUsers = async () => {
    try {
      const { data } = await userRepository.getUsers();
      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const getStats = async () => {
    try {
      const { data } = await dashboardRepository.getStats();
      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getRevenue = async () => {
    try {
      const { data } = await dashboardRepository.getRevenu();
      updateRevenueData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (appoint) => {
    setLoading(true);
    let objInfo;
    try {
      const { status, data } = await appointmentRepository.updateStatus(
        appoint
      );
      console.log(data);
      objInfo = status;
    } catch (error) {
      console.log(error);
      objInfo = error.message;
      // window.alert(error.message);
    }
    setLoading(false);
    return objInfo;
  };

  const updateRevenueData = (revenue) => {
    let pData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let doneData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    console.log(revenue);
    revenue.forEach((rev) => {
      pData.splice(rev.month - 1, 0, rev.revenue);
      doneData.splice(rev.month - 1, 0, rev.count);
    });

    console.log(pData);

    setDoneDealsData(doneData);
    setProfitData(pData);
  };

  const handleDeleteAppointment = async (appointId) => {
    try {
      const { status, data } = await appointmentRepository.deleteAppointment(
        appointId
      );
      if (status == 200) {
        window.alert("Appointment deleted successfully");
      }
    } catch (error) {
      window.alert(error.message);
    }
  };

  const updateStats = (appointments) => {
    let done = 0;
    let pending = 0;
    let canceled = 0;
    appointments.forEach((appoint) => {
      let format = "MM/DD/YYYY";
      let d = moment(appoint.start_time).format(format);
      let appD = moment(date).format(format);
      if (d === appD) {
        if (appoint.status === "done") {
          done++;
        } else if (appoint.status === "canceled") {
          canceled++;
        } else if (
          appoint.status === "in-progress" ||
          appoint.status === "hold"
        ) {
          pending++;
        }
      }
    });
    setPending(pending);
    setCanceled(canceled);
    setDone(done);
  };
  const refresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    const HomeInit = async () => {
      setLoading(true);
      await getAppointments();
      await getUsers();
      await getStats();
      await getRevenue();
      setLoading(false);
    };
    HomeInit();
  }, [refreshKey]);

  useEffect(() => {
    updateStats(appointmentsData);
  }, [date]);

  return {
    appointmentsData,
    handleDeleteAppointment,
    users,
    doneDealsData,
    profitData,
    date,
    done,
    pending,
    canceled,
    setDate,
    updateStats,
    stats,
    updateStatus,
    refresh,
  };
};

export default HomeViewModel;
