import React from "react";
import SoundGeneratorButton from "./components/SoundGeneratorButton";

// Componente principal da aplicação.
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container"></div>
        <SoundGeneratorButton input={"A1"}></SoundGeneratorButton>
      </header>
    </div>
  );
}

export default App;
