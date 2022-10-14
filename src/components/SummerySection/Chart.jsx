import React, { Component, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

function Chart(props) {
  const { revenueData, date, isDoneDeal } = props;
  const [monthsData, setMonthsData] = useState([]);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  // console.log(date);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text:
          new Date(date).getFullYear() + "" + isDoneDeal
            ? `Done Deals`
            : "Profit",
      },
    },
  };

  // function updateChart() {
  //   let tempD = [...appointmentsData].filter((appoint) => {
  //     let appD = new Date(appoint.start_time);

  //     return (
  //       new Date(date).getFullYear() == appD.getFullYear() &&
  //       appoint.status == "done"
  //     );
  //   });
  //   const _ = require("lodash");
  //   // console.log(props.appointmentsData);

  //   const monthsDataObject = _.groupBy(tempD, ({ start_time }) =>
  //     new Date(start_time).getMonth()
  //   );
  //   let mothsD = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  //   Object.keys(monthsDataObject).forEach((objkey) => {
  //     mothsD[objkey] = monthsDataObject[objkey].length;
  //   });
  //   setMonthsData(mothsD);
  // }

  // React.useEffect(() => {
  //   updateChart();
  // }, [date]);

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: isDoneDeal ? "done" : "שיקל",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        // borderColor: "rgba(75,192,192,1)",
        borderColor: isDoneDeal ? "rgba(75,192,192,1)" : "red",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: revenueData,
      },
    ],
  };

  return (
    <div className="Chart-container">
      <Line options={options} data={data}></Line>
    </div>
  );
}

export default Chart;
