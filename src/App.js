import DashBoard from "./components/DashBoard";
import { APIContextProvider } from "./components/Context/apiContext";
import { FormatContextProvider } from "./components/Context/formatContext";
function App() {
  return (
    <FormatContextProvider>
      <APIContextProvider>
        <DashBoard />
      </APIContextProvider>
    </FormatContextProvider>
  );
}

export default App;
