// pages/api/editoras/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import ControleEditora from '../../../../classes/controle/ControleEditora';

const controleEditora = new ControleEditora(); // Assume-se que ControleEditora está corretamente importado

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const editoras = controleEditora.getEditoras();
            res.status(200).json(editoras);
        } catch (error) {
            console.error('Server error:', error);
            res.status(500).end('Internal Server Error');
        }
    } else {
        res.status(405).end('Method not allowed');
    }
};

export default handler;
