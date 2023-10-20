import React from "react";
import Livro from "../classes/modelo/Livro";
import ControleEditora from "../classes/controle/ControleEditora"; 

const controleEditora = new ControleEditora();

interface LinhaLivroProps {
  livro: Livro;
  excluir: () => void;
}

export const LinhaLivro: React.FC<LinhaLivroProps> = (props) => {
  const { livro, excluir } = props;

  const editoraNome = controleEditora.getNomeEditora(livro.codEditora);

  return (
    <tr>
      <td>
        {livro.titulo} <br />
        <button className="btn btn-danger" onClick={excluir}>
          Excluir
        </button>
      </td>
      <td>{livro.resumo}</td>
      <td>{editoraNome}</td>
      <td>
        {livro.autores.map((autor, index) => (
          <li key={index}>{autor}</li>
        ))}
      </td>
    </tr>
  );
};

