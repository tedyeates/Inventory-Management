import type { NextApiRequest, NextApiResponse } from "next"
import { getSuggestions } from "lib/select-suggestions"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        return res.status(405).json({message: 'E02: Method not allowed'})
    }

    const collection = req.query.collection
    const search = req.query.search

    if (typeof collection === 'string' && typeof search === 'string') {
        return res
            .status(200)
            .json({suggestions: await getSuggestions(collection, search)})
    }

    res.status(400).json({message: 'E01: Incorrect URL format'})

}

export default handler