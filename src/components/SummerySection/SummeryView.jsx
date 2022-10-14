import React, { Component, useState, useContext } from "react";
import Chart from "./Chart";
import APIContext from "../Context/apiContext";
function SummeryView(props) {
  // const { revenue } = props;
  const [isProfit, setIsProfit] = useState(false);
  const { revenue } = useContext(APIContext);
  React.useEffect(() => {
    updateRevenueData();
  }, [revenue]);

  function updateRevenueData() {
    if (!revenue.data) {
      return;
    }
    let pData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let doneData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    revenue.data.forEach((rev) => {
      pData.splice(rev.month - 1, 0, rev.revenue);
      doneData.splice(rev.month - 1, 0, rev.count);
    });

    setDoneDealsData(doneData);
    setProfitData(pData);
  }
  const [doneDealsData, setDoneDealsData] = useState([]);
  const [profitData, setProfitData] = useState([]);
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
