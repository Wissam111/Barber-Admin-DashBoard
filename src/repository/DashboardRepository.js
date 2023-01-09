import { useApiContext } from "../hooks/useApiContext";
const DashboardRepository = () => {
  const { apiCall } = useApiContext();

  const getStats = async () => {
    const data = apiCall("dashboard/stats");
    return data;
  };
  const getRevenu = async () => {
    const data = apiCall("dashboard/worker-revenue");
    return data;
  };

  return { getStats, getRevenu };
};
export default DashboardRepository;
