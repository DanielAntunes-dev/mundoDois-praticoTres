import { NextApiRequest, NextApiResponse } from 'next';
import ControleLivros from '../../../../classes/controle/ControleLivros';

const controleLivros = new ControleLivros(); 

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { codigo } = req.query;
        controleLivros.excluir(Number(codigo));
        res.status(200).json({ message: 'Livro excluído com sucesso.' });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).end('Internal Server Error');
    }
};

export default handler;
