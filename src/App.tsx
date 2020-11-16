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
              <div className={"alert alert-primary"} style = {{fontSize: 14 , width: 800}}>
                <strong style = {{fontSize: 16}}>Instruções de uso:</strong>
                <p style = {{paddingLeft: 10}}>Insira o texto na caixa abaixo e/ou arquivo para gerar um som. Cada caractere corresponde a um tipo de nota ou ação, abaixo seguem as instruções:</p>
                
                <strong style = {{marginTop: 15}}>- Para tocar notas musicais, digite:</strong>
                <p style = {{paddingLeft: 20}}>As letras: A,B,C,D,E,F ou G</p>

                <strong style = {{marginTop: 35}}>- Para tocar o instrumento, digite:</strong>
                <p style = {{paddingLeft: 20}}>- '!' para trocar para Agogo;</p>
                <p style = {{paddingLeft: 20}}>- 'O,o,U,u,I,i' para trocar para Harpsichord;</p>
                <p style = {{paddingLeft: 20}}>- 'enter' para trocar para Sinos Tubulares;</p>
                <p style = {{paddingLeft: 20}}>- ',' para trocar para Orgão de Igreja;</p>
                <p style = {{paddingLeft: 20}}>- Qualquer número para trocar para outro instrumento aleatório;</p>

                <strong style = {{marginTop: 35}}>- Para dobrar o volume de reprodução, digite:</strong>
                <p style = {{paddingLeft: 20}}>- O caractere 'espaço' (caso não seja possível aumentar, o volume irá voltar ao normal).</p>

                <strong style = {{marginTop: 35}}>- Para aumentar uma oitava da nota, digite:</strong>
                <p style = {{paddingLeft: 20}}>- O caractere '?'</p>

                <strong style = {{marginTop: 35}}>- Para repetir a nota anterior digite (caso o caractere anterior não seja uma nota, será feita uma pausa ou silêncio):</strong>
                <p style = {{paddingLeft: 20}}> - As letras: a,b,c,d,e,f ou g</p>
                <p style = {{paddingLeft: 20}}> - Qualquer consoante que não esteja presente no conjunto de notas;</p>
                <p style = {{paddingLeft: 20}}> - Qualquer outro caractere não referenciado nos outros tópicos.</p>
                
                <strong style = {{marginTop: 35}}>Para tocar a música aperte no botão 'Tocar' e para fazer o download dela, aperte em 'Download.'</strong>
                
                <p style = {{marginTop: 10}}>Boa composição, aproveite!</p>

                {/* <strong>Lista de comandos:</strong>
                <ul>
                  <li>
                    Uma nota é um caractere seguido de A até G (maiusculo).
                  </li>
                  <li>I Troca o instrumento</li>
                </ul> */}
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
              <SoundGeneratorButton input={textInput}></SoundGeneratorButton>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
