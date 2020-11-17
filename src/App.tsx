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
          <div style={{ marginTop: "5%" }}>
            <div className="row justify-content-center align-items-center">
              <div
                className={"alert alert-primary"}
                style={{ fontSize: 14, width: 800 }}
              >
                <strong style={{ fontSize: 16 }}>Instruções de uso:</strong>
                <p style={{ paddingLeft: 10 }}>
                  Insira o texto na caixa abaixo ou faça upload de um arquivo de
                  texto para gerar um som. Cada caractere corresponde a um tipo
                  de nota ou ação, abaixo seguem as instruções:
                </p>

                <strong style={{ marginTop: 15 }}>
                  - Para tocar alguma nota musical, digite:
                </strong>
                <p style={{ paddingLeft: 20 }}>
                  As letras: <b>A,B,C,D,E,F ou G</b>
                </p>

                <strong style={{ marginTop: 35 }}>
                  - Para trocar o instrumento, digite:
                </strong>
                <p style={{ paddingLeft: 20 }}>
                  - <b>'!'</b> para trocar para Agogo;
                </p>
                <p style={{ paddingLeft: 20 }}>
                  - Qualquer caractere de <b>'O,o,U,u,I,i'</b> para trocar para
                  Harpsichord;
                </p>
                <p style={{ paddingLeft: 20 }}>
                  - <b>'enter (nova linha)'</b> para trocar para Sinos
                  Tubulares;
                </p>
                <p style={{ paddingLeft: 20 }}>
                  - <b>','</b> para trocar para Orgão de Igreja;
                </p>
                <p style={{ paddingLeft: 20 }}>
                  - <b>';'</b> para trocar para Flauta de pã;
                </p>
                <p style={{ paddingLeft: 20 }}>
                  - Um numero de <b>0 à 9</b> para trocar para o instrumento
                  referente ao numéro do instrumento atual somado com o numero
                  digitado;
                </p>

                <strong style={{ marginTop: 35 }}>
                  - Para dobrar o volume de reprodução, digite:
                </strong>
                <p style={{ paddingLeft: 20 }}>
                  - O caractere '<b>espaço</b>' (caso não seja possível
                  aumentar, o volume irá voltar ao normal).
                </p>

                <strong style={{ marginTop: 35 }}>
                  - Para aumentar uma oitava da nota, digite:
                </strong>
                <p style={{ paddingLeft: 20 }}>
                  - O caractere <b>'?'</b> ou o caractere <b>.</b> (ponto)
                </p>

                <strong style={{ marginTop: 35 }}>
                  - Para repetir a nota anterior digite qualquer uma das
                  alternativas a seguir (caso o caractere anterior não seja uma
                  nota, será feita uma pausa ou silêncio):
                </strong>
                <p style={{ paddingLeft: 20 }}>
                  - <b>As letras: a,b,c,d,e,f ou g</b>
                </p>
                <p style={{ paddingLeft: 20 }}>
                  {" "}
                  - Qualquer consoante que não esteja presente no conjunto de
                  notas;
                </p>
                <p style={{ paddingLeft: 20 }}>
                  {" "}
                  - Qualquer outro caractere não referenciado nos outros
                  tópicos.
                </p>

                <strong style={{ marginTop: 35 }}>
                  Para tocar a música aperte no botão 'Tocar' e para fazer o
                  download dela, aperte em 'Download.'
                </strong>

                <p style={{ marginTop: 10 }}>Boa composição, aproveite!</p>
              </div>
            </div>
            <div className="row">
              <textarea
                className="form-control"
                value={textInput}
                onChange={(e) => {
                  setTextInput(e.target.value);
                }}
              ></textarea>
              <SoundGeneratorButton
                input={textInput}
                setInput={setTextInput}
              ></SoundGeneratorButton>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
