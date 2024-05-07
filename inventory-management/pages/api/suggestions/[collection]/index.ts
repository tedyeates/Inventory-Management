import type { NextApiRequest, NextApiResponse } from "next"
import { getSuggestions } from "lib/select-suggestions"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        return res.status(405).json({message: 'E02: Method not allowed'})
    }

    const collection = req.query.collection

    if (typeof collection === 'string') {
        res
            .status(200)
            .json({suggestions: await getSuggestions(collection)})
    }
    else {
        res.status(400).json({message: 'E01: Incorrect URL Format'})
    }

}

export default handler