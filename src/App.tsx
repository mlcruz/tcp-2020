import React, { useState } from "react";
import SoundGeneratorButton from "./components/SoundGeneratorButton";

// Componente principal da aplicação.
// Utilizamos aqui um componente funcional em vez de um orientado a objetos
// Componentes orientados a objeto são "legacy", e utilizaremos no resto do trabalho só para
// conformar com a necessidade do trabalho ser orientado a objetos
// Um componente funcionar retornando é o equivalente de uma chamada do render() em um compoennete orientado a objetos

function App() {
  // Aqui criamos um estado para o campo de texto, iniciando vazio. A ideia é que o input vai modificar  esse campo.
  // O texto docampo então é passado como parametro para o componente gerador de som

  const [textInput, setTextInput] = useState("ABCDEFG");

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div style={{ marginTop: "10%" }}></div>
          <div className="row justify-content-center align-items-center">
            <div className={"alert alert-primary"}>
              <p>Insira o texto para gerar o som na caixa abaixo</p>
              <strong>Lista de comandos:</strong>
              <ul>
                <li>Uma nota é um caractere seguido de A até G (maiusculo).</li>
                <li>I Troca o instrumento</li>
              </ul>
            </div>
          </div>
          <div className="row justify-content-center align-items-center">
            <div className={"col-sm-6"}>
              <textarea
                className="form-control"
                value={textInput}
                onChange={(e) => {
                  setTextInput(e.target.value);
                }}
              ></textarea>
            </div>
            <div className={"colm-6"}>
              <SoundGeneratorButton input={textInput}></SoundGeneratorButton>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
