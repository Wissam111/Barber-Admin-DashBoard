import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import RefreshButton from "../../components/RefreshButton";
import StatusCard from "../../components/StatusCard";
import ActiveAppointments from "../../components/ActiveAppointments";
import Customers from "../../components/Customers";
import PercentageCard from "../../components/PercentageCard";

import HomeViewModel from "./HomeViewModel";
import { Link } from "react-router-dom";
function Home() {
  const {
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
  } = HomeViewModel();
  return (
    <div className="page-container">
      <RefreshButton refresh={refresh} />
      <div className="homeView-container">
        <div className="date-container">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Pick a date"
              value={date}
              onChange={(newValue) => {
                setDate(newValue["$d"]);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <div className="homeSection-primary">
          <div className="active-appoints">
            <div className="statusCards-container">
              <StatusCard
                imgUrl={require("../../../assets/icons/delivery-box.png")}
                status={"Done"}
                statsNumber={done}
                className="status-card"
              />
              <StatusCard
                imgUrl={require("../../../assets/icons/pending.png")}
                status={"Pending"}
                statsNumber={pending}
              />
              <StatusCard
                imgUrl={require("../../../assets/icons/delivery-cancelled.png")}
                status={"Canceled"}
                statsNumber={canceled}
              />
            </div>
            <ActiveAppointments
              date={date}
              appointmentsData={appointmentsData}
              DeleteAppoint={handleDeleteAppointment}
              UpdateStats={updateStats}
              sliceNumb={5}
              updateStatus={updateStatus}
            />
            <div className="charts-container">
              <PercentageCard revenueData={doneDealsData} />
              <PercentageCard revenueData={profitData} isProfit={true} />
            </div>
          </div>

          <div className="statusPrect-container">
            <StatusCard
              imgUrl={require("../../../assets/icons/percentage.png")}
              status={"Number of deals "}
              statsNumber={stats?.appointmentsCount}
            />
            <StatusCard
              imgUrl={require("../../../assets/icons/cd-scetch.png")}
              status={"Total number of users "}
              statsNumber={users.length}
            />
            <div className="recent-customers">
              <div className="recent-cta">
                <h3 className="recentLogo">Recent Customers</h3>
                <Link className="viewAll" to="/users">
                  View all
                </Link>
              </div>

              <Customers users={users?.slice(0, 5)} isHome={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
