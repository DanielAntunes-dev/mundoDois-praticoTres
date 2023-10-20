import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Menu } from "../../componentes/Menu";
import ControleEditora from "../../classes/controle/ControleEditora";
import Livro from "../../classes/modelo/Livro";
import { useRouter } from "next/router";

const controleEditora = new ControleEditora();
const baseURL = "http://localhost:3000/api/livros";

const LivroDados: React.FC = () => {
  const [opcoes, setOpcoes] = useState<{ value: number; text: string }[]>([]);
  const [titulo, setTitulo] = useState("");
  const [resumo, setResumo] = useState("");
  const [autores, setAutores] = useState("");
  const [codEditora, setCodEditora] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const editorasOptions = controleEditora.getEditoras().map((editora) => ({
      value: editora.codEditora,
      text: editora.nome,
    }));
    setOpcoes(editorasOptions);
  }, []);

  const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value, 10);
    setCodEditora(selectedValue);
  };

  const incluir = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const autoresArray = autores.split("\n").map((autor) => autor.trim());

    const novoLivro: Livro = {
      codigo: 0,
      codEditora,
      titulo,
      resumo,
      autores: autoresArray,
    };

    try {
      const response = await fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoLivro),
      });

      if (response.ok) {
        router.push("/livroLista");
      } else {
        console.error("Erro ao incluir livro:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao incluir livro:", error);
    }
  };

  return (
    <div>
      <Head>
        <title>Loja Next - Dados do Livro</title>
      </Head>
      <Menu />
      <main className="container mt-4">
        <h1>Inclusão de Livro </h1>
        <form onSubmit={incluir}>
          <div className="form-group">
            <label>Título:</label>
            <input
              type="text"
              className="form-control"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Resumo:</label>
            <textarea
              className="form-control"
              value={resumo}
              onChange={(e) => setResumo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Editora:</label>
            <select
              className="form-control"
              value={codEditora}
              onChange={tratarCombo}
            >
              {opcoes.map((opcao) => (
                <option key={opcao.value} value={opcao.value}>
                  {opcao.text}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Autores (um por linha):</label>
            <textarea
              className="form-control"
              value={autores}
              onChange={(e) => setAutores(e.target.value)}
            />
          </div>

          <hr />
          <button type="submit" className="btn btn-primary">
            Incluir Livro
          </button>
        </form>
      </main>
    </div>
  );
};

export default LivroDados;
