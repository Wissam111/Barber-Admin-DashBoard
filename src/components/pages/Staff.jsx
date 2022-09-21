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
    />
  );
}

export default Staff;
