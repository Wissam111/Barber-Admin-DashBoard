import React, { Component } from "react";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";

function PercentageCard(props) {
  const { revenueData, isProfit } = props;
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currMonth = new Date().getMonth();
  const percentage = Math.floor(
    (revenueData[currMonth] /
      revenueData.reduce((partialSum, a) => partialSum + a, 0)) *
      100
  );
  return (
    <div className="percentagecard-container">
      <Link to="/revenue" className="chartLink">
        <i class="fa-solid fa-chart-line"></i>
      </Link>
      <div className="prec-leftcol">
        <h3>{isProfit ? "Revenue" : "Done Deals"}</h3>

        <div className="monthdata">
          <p>
            <span style={{ color: "gray" }}>{month[currMonth]}</span>
            {isProfit ? " total Revenue" : " total Done Deals"}
          </p>
          <span className="totalMonthProfit">
            {`${revenueData[currMonth]}${isProfit ? "₪" : ""}`}
          </span>
        </div>
      </div>
      <div className="prec-rightcol">
        <div className="precentage-wrapper">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              textColor: "orange",
              pathColor: !isProfit ? "rgb(16, 145, 16)" : "",
              //   trailColor: "rgb(173, 171, 171)",
            })}
          />
        </div>
      </div>
    </div>
  );
}

export default PercentageCard;
