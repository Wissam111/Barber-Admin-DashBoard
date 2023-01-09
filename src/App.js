import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./presentation/Pages/Home/Home";
import NavBar from "./presentation/components/NavBar";
import Entry from "./presentation/Pages/Entry/Entry";
import ProtectedRoute from "./presentation/components/ProtectedRoute ";
import { useAuthContext } from "./hooks/useAuthContext";
import LoadingScreen from "./presentation/components/LoadingScreen";
import Agenda from "./presentation/Pages/Agenda/Agenda";

import "./css/style.css";

import { useLoadingContext } from "./hooks/useLoadingContext";
import Staff from "./presentation/Pages/Staff/Staff";

function App() {
  const { authData } = useAuthContext();
  const { loading } = useLoadingContext();
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        {loading && <LoadingScreen />}
        {authData && <NavBar />}
        <Routes>
          <Route exact path="/" element={<Entry />} />
          <Route exact path="/home" element={<ProtectedRoute />}>
            <Route exact path="/home" element={<Home />} />
          </Route>
          <Route exact path="/agenda" element={<Agenda />}>
            <Route exact path="/agenda" element={<Agenda />} />
          </Route>
          <Route exact path="/staff" element={<Staff />}>
            <Route exact path="/staff" element={<Staff />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
