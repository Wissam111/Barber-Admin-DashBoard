import Main from "./components/Main";
import { APIContextProvider } from "./components/Context/apiContext";
import { FormatContextProvider } from "./components/Context/formatContext";
import HomeView from "./components/HomeView";
function App() {
  // const [date, setDate] = useState(new Date());

  return (
    <FormatContextProvider>
      <APIContextProvider>
        <Main />

        {/* <HomeView /> */}
      </APIContextProvider>
    </FormatContextProvider>
  );
}

export default App;
