import { NextApiRequest, NextApiResponse } from 'next'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	res.status(200).json({ response: 'Sup broski' })
}

export default handler
