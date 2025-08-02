import { Toaster } from "react-hot-toast";

import MainApp from "./template/MainApp";
import FilterContactContext from "./context/FilterContactContext";
import FormContext from "./context/FormContext";

function App() {

  return (
    <FilterContactContext>
      <FormContext>

        <MainApp />

        <Toaster />
      </FormContext>
    </FilterContactContext>

  );
}

export default App;


