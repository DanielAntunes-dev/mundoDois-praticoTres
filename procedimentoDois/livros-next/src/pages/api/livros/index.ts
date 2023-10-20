// pages/api/livros/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import ControleLivros from '../../../../classes/controle/ControleLivros';

const controleLivros = new ControleLivros(); 

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    
    if (req.method === 'GET') {
        try {
            const livros = controleLivros.obterLivros();
            res.status(200).json(livros);
        } catch (error) {
            console.error('Server error:', error);
            res.status(500).end('Internal Server Error');
        }
    } else if (req.method === 'POST') {
        try {
            const novoLivro = req.body; 
            controleLivros.incluir(novoLivro);
            res.status(200).json({ message: 'Livro adicionado com sucesso.' });
        } catch (error) {
            console.error('Server error:', error);
            res.status(500).end('Internal Server Error');
        }
    } else {
        res.status(405).end('Method not allowed');
    }
};

export default handler;
