import React, { Component, useState, useContext } from "react";
import Chart from "./Chart";
import APIContext from "../Context/apiContext";
function SummeryView(props) {
  const [isProfit, setIsProfit] = useState(false);
  const { doneDealsData, profitData } = useContext(APIContext);

  return (
    <div className="summery-container">
      <div className="summery-info">
        <h1>{isProfit ? "Income Summery" : "Deals Summery"}</h1>

        <div className="picki">
          <button
            className={isProfit ? "selectBtn activeS" : "selectBtn"}
            onClick={() => setIsProfit(true)}
          >
            Revenue
          </button>
          <button
            className={!isProfit ? "selectBtn activeS" : "selectBtn"}
            onClick={() => setIsProfit(false)}
          >
            Done Deals
          </button>
        </div>
      </div>
      <div className="summery-chart">
        <Chart
          revenueData={isProfit ? profitData : doneDealsData}
          date={new Date()} // need to change
          isDoneDeal={isProfit ? false : true}
        />
      </div>
    </div>
  );
}

export default SummeryView;
