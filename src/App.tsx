import React from "react";
import SoundGeneratorButton from "./components/SoundGeneratorButton";
import { parseNotesFromText } from "./utils/parseTextInput";

// Componente principal da aplicação.
function App() {
  console.log(parseNotesFromText("A1A2A3A3B#4"));

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div style={{ marginTop: "10%" }}>
            <div
              className="row justify-content-center align-items-center"
              style={{ marginTop: "auto", marginBottom: "auto" }}
            >
              <div className={"col-sm-6"}>
                <input type="text" className="form-control" />
              </div>
              <div className={"colm-6"}>
                <SoundGeneratorButton
                  input={"A1C2C3D4G5"}
                ></SoundGeneratorButton>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
