import { useState, useEffect } from "react";
import DashboardRepository from "../../../repository/DashboardRepository";
import { useLoadingContext } from "../../../hooks/useLoadingContext";
const RevenueViewModel = () => {
  const [doneDealsData, setDoneDealsData] = useState([]);
  const [profitData, setProfitData] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const { setLoading } = useLoadingContext();
  const dashboardRepository = DashboardRepository();

  const getRevenue = async () => {
    try {
      const { data } = await dashboardRepository.getRevenu();
      updateRevenueData(data.data);
    } catch (error) {
      console.log(error);
    }
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

  const refresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    const RevenueInit = async () => {
      setLoading(true);
      await getRevenue();
      setLoading(false);
    };
    RevenueInit();
  }, [refreshKey]);

  return { profitData, doneDealsData, refresh };
};

export default RevenueViewModel;
