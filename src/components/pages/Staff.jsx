import StaffWorkingHours from "../StaffSection/StaffWorkingHours";

function Staff(props) {
  const {
    workers,
    appointmentsData,
    timeFormat,
    dateFormat,
    PostTime,
    DeleteAppoint,
    UpdateStatus,
    DeleteUser,
  } = props;
  return (
    <StaffWorkingHours
      workers={workers}
      appointmentsData={appointmentsData}
      timeFormat={timeFormat}
      dateFormat={dateFormat}
      PostTime={PostTime}
      DeleteAppoint={DeleteAppoint}
      UpdateStatus={UpdateStatus}
      DeleteUser={DeleteUser}
    />
  );
}

export default Staff;
