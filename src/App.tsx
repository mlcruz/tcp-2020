import React, { useState } from "react";
import SoundGeneratorButton from "./components/SoundGeneratorButton";
import { parseNotesFromText } from "./utils/parseTextInput";
import { SampleLibrary } from "./external-packages/tone-instruments/Tonejs-Instruments";

// Componente principal da aplicação.
// Utilizamos aqui um componente funcional em vez de um orientado a objetos
// Componentes orientados a objeto são "legacy", e utilizaremos no resto do trabalho só para
// conformar com a necessidade do trabalho ser orientado a objetos
// Um componente funcionar retornando é o equivalente de uma chamada do render() em um compoennete orientado a objetos

function App() {
  // Aqui criamos um estado para o campo de texto, iniciando vazio. A ideia é que o input vai modificar
  // esse campo.
  // O texto docampo então é passado como parametro para o componente gerador de som

  const [textInput, setTextInput] = useState("ABCD");

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div style={{ marginTop: "10%" }}></div>
          <div className="row justify-content-center align-items-center">
            <div className={"alert alert-primary"}>
              <p>
                Uma nota é um caractere seguido de um numero, com um possivel
                sustenido no meio. Sempre terminador por numero. (Vamos mudar
                isso depois).
              </p>
              <p>
                O caractere representa (+sustenido) a 'Nota' e o numero a
                oitava. Ex: A8, B6, C#2
              </p>
              <p>Notas tocam a cada 0.5 segundo.</p>
            </div>
          </div>
          <div className="row justify-content-center align-items-center">
            <div className={"col-sm-6"}>
              <input
                type="text"
                className="form-control"
                value={textInput}
                onChange={(e) => {
                  setTextInput(e.target.value);
                }}
              />
            </div>
            <div className={"colm-6"}>
              <SoundGeneratorButton
                input={textInput}
                initialInstrument={"piano"}
                instrumentsToLoad={[
                  "guitar-acoustic",
                  "piano",
                  "bass-electric",
                  "harp",
                  "xylophone",
                ]}
              ></SoundGeneratorButton>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
