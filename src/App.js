import Main from "./components/Main";
import { APIContextProvider } from "./components/Context/apiContext";
import { FormatContextProvider } from "./components/Context/formatContext";
function App() {
  return (
    <FormatContextProvider>
      <APIContextProvider>
        <Main />
      </APIContextProvider>
    </FormatContextProvider>
  );
}

export default App;
