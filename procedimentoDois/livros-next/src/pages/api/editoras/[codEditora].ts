// pages/api/editoras/[codEditora].ts
import { NextApiRequest, NextApiResponse } from 'next';
import ControleEditora from '../../../../classes/controle/ControleEditora';

const controleEditora = new ControleEditora();

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { codEditora } = req.query;
        const editoraNome = controleEditora.getNomeEditora(Number(codEditora));

        if (editoraNome) {
            res.status(200).json({ nome: editoraNome });
        } else {
            res.status(404).end('Editora not found');
        }
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).end('Internal Server Error');
    }
};

export default handler;
