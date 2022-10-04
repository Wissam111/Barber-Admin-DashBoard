import StaffWorkingHours from "../StaffSection/StaffWorkingHours";

function Staff(props) {
  const {
    workers,
    appointmentsData,
    timeFormat,
    dateFormat,
    PostTime,
    DeleteAppoint,
    UnBookAppoint,
    BookAppoint,
    UpdateStatus,
  } = props;
  return (
    <StaffWorkingHours
      workers={workers}
      appointmentsData={appointmentsData}
      timeFormat={timeFormat}
      dateFormat={dateFormat}
      PostTime={PostTime}
      DeleteAppoint={DeleteAppoint}
      UnBookAppoint={UnBookAppoint}
      BookAppoint={BookAppoint}
      UpdateStatus={UpdateStatus}
    />
  );
}

export default Staff;
