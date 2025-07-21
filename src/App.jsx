import { Toaster } from "react-hot-toast";
import FilterContactContext from "./context/FilterContactContext";
import MainApp from "./template/MainApp";

function App() {

  return (
    <FilterContactContext>

      <MainApp />

      <Toaster />
    </FilterContactContext>

  );
}

export default App;


