// Separamos a entrada de texto em uma lista de notas a serem tocadas
export function parseNotesFromText(input: string) {
  let separated = [];
  let note = [];

  for (const char of input) {
    // Array contendo nota atual ser inserida
    // Usamos um regex para verificar se é digito ou caractere

    if (char.match(/[\d]/)) {
      // se é digito insere na nota atual, insere nota na lista final e inicia nova nota
      note.push(char);
      separated.push(note.toString().replace(",", ""));
      note = [];
    } else {
      // Se não é digito insere na nota atual
      note.push(char);
    }
  }

  return separated;
}
