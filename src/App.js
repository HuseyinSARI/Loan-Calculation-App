////////////////////////////////////////7
//
//  Context API kullanarak elimizdeki verileri alt component lere yolladığımız yer.
//
//////////////////////////////////


import "./App.css";
import Container from "./components/Container";

import { InputDataProvider } from "./context/InputDataContext";
import { CalculationProvider } from "./context/CalculationContext";

function App() {
  return (
    <div className="app">
      <InputDataProvider>       
        <CalculationProvider>
          <Container />
        </CalculationProvider>
      </InputDataProvider>
    </div>
  );
}

export default App;
