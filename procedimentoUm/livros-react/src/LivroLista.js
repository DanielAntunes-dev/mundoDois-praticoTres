import React, { useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import ControleLivros from "./controle/ControleLivros";
import ControleEditora from "./controle/ControleEditora";

const LivroLista = () => {
  const [livros, setLivros] = useState([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    const controleLivro = new ControleLivros();
    const livrosObtidos = controleLivro.obterLivros();
    setLivros(livrosObtidos);
    setCarregado(true);
  }, [carregado]);

  const excluirLivro = (codigo) => {
    const controleLivro = new ControleLivros();
    controleLivro.excluir(codigo);
    setCarregado(!carregado); 
  };

  const LinhaLivro = ({ livro }) => {
    const controleEditora = new ControleEditora();
    const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

    return (
      <tr key={livro.codigo}>
        <td>
          {livro.titulo} <br />
          <button
            className="btn btn-danger"
            onClick={() => excluirLivro(livro.codigo)}
          >
            Excluir
          </button>
        </td>
        <td>{livro.resumo}</td>
        <td>{nomeEditora}</td>
        <td>
          {livro.autores.map((autor, index) => (
            <li key={index}>{autor}</li>
          ))}
        </td>
      </tr>
    );
  };

  return (
    <main className="container">
      <h1 className="my-4">Catálogo de Livros</h1>
      {carregado && (
        <table className="table table-striped ">
          <thead>
            <tr className="table-dark">
              <th>Título</th>
              <th>Resumo</th>
              <th>Editora</th>
              <th>Autores</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro) => (
              <LinhaLivro key={livro.codigo} livro={livro} />
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
};

export default LivroLista;
