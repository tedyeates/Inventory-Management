import { Db } from "mongodb"

export const getCollectionPage = async (
    db: Db, collectionName:string, 
    page:number, rowsPerPage: number = 10
) => {
    const pipeline = [
        {
            $facet: {
                data: [
                    { $skip: (page - 1) * rowsPerPage }, 
                    { $limit: rowsPerPage }
                ],
                totalCount: [{ $count: "total"}]
            }
        }
    ]

    const results = await db
        .collection(collectionName)
        .aggregate(pipeline)
        .toArray()

    return results[0]
}