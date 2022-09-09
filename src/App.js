import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
function App() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="app">
      <div className="calendar-container">
        <Calendar
          calendarType={"Hebrew"}
          onChange={setDate}
          value={date}
          minDate={new Date(2022, 6, 1)}
        />
      </div>
      <p className="text-center">
        <span className="bold">Selected Date:</span> {date.toDateString()}
      </p>
    </div>
  );
}

export default App;
