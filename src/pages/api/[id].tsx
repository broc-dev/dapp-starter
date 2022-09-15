import { NextApiRequest, NextApiResponse } from 'next'
import { readFile } from 'fs';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    if(Number(id) >= 0 && Number(id) <= 3000) {
        const metadata = await readFile(`public/krakenData/json/${id}.json`, (err, data) => {
            if(err) {
                console.log(err);
                return res.status(500).json({ error: 'Internal server error' });
            } else {
                return res.status(200).json(JSON.parse(data.toString()));
            }
        });
        // console.log(metadata);

        // res.status(200).json({ name: `Sup sneega ${id}`, image: metadata })
    } else {
        const krakenMetadata = 
        res.status(404).json({ error: 'Not found' })
    }
}

export default handler