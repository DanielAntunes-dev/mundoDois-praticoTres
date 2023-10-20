import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Menu } from "../../componentes/Menu";
import {LinhaLivro} from "../../componentes/LinhaLivro";
import Livro from "../../classes/modelo/Livro";

const baseURL = "http://localhost:3000/api/livros";

const LivroLista: React.FC = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [carregado, setCarregado] = useState(false);

  const obterLivros = async () => {
    try {
      const response = await fetch(baseURL);
      if (response.ok) {
        const data = await response.json();
        setLivros(data);
        setCarregado(true);
      } else {
        console.error("Erro ao obter livros:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao obter livros:", error);
    }
  };

  const excluirLivro = async (codigo: number) => {
    try {
      const response = await fetch(`${baseURL}/${codigo}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setCarregado((prev) => !prev);
      } else {
        console.error("Erro ao excluir livro:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao excluir livro:", error);
    }
  };

  useEffect(() => {
    obterLivros();
  }, [carregado]);

  return (
    <div>
      <Head>
        <title>Loja Next - Lista de Livros</title>
      </Head>
      <Menu />
      <main className="container">
        <h1 className="my-4">Catálogo de Livros</h1>
        {carregado && (
          <table className="table table-striped">
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
                <LinhaLivro
                  key={livro.codigo}
                  livro={livro}
                  excluir={() => excluirLivro(livro.codigo)}
                />
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};

export default LivroLista;
