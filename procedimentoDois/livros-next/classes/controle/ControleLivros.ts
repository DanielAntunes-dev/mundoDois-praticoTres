import Livro from '../modelo/Livro';

let livros: Livro[] = [
    new Livro(1, 1, 'Livro 1', 'Resumo livro 1', ['Autor 1', 'Autor 2']),
    new Livro(2, 2, 'Livro 2', 'Resumo livro 2', ['Autor 3']),
    new Livro(3, 3, 'Livro 3', 'Resumo livro 3', ['Autor 4', 'Autor 5']),
];

class ControleLivros {
    obterLivros(): Livro[] {
        return livros;
    }

    incluir(novoLivro: Livro): void {
        const novoCodigo = Math.max(...livros.map((livro) => livro.codigo), 0) + 1;
        novoLivro.codigo = novoCodigo;
        livros.push(novoLivro);
    }

    excluir(codigo: number): void {
        const livroIndex = livros.findIndex((livro) => livro.codigo === codigo);
        if (livroIndex !== -1) {
            livros.splice(livroIndex, 1);
        }
    }
}

export default ControleLivros;
