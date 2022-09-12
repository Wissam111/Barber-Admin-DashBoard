import Main from "./components/Main";
import { APIContextProvider } from "./components/Context/apiContext";
import { FormatContextProvider } from "./components/Context/formatContext";
function App() {
  // const [date, setDate] = useState(new Date());

  return (
    <FormatContextProvider>
      <APIContextProvider>
        <Main />
      </APIContextProvider>
    </FormatContextProvider>
  );
}

export default App;
