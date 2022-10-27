import DashBoard from "./components/DashBoard";
import { APIContextProvider } from "./components/Context/apiContext";
import { FormatContextProvider } from "./components/Context/formatContext";
import { AuthProvider } from "./components/Context/AuthProvider";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
function App() {
  return (
    <Router>
    <FormatContextProvider>
      <AuthProvider>
      <APIContextProvider>
        <DashBoard />
      </APIContextProvider>
      </AuthProvider>
    </FormatContextProvider>
    </Router>
  );
}

export default App;
