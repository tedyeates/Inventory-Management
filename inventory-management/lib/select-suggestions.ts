import clientPromise from "./mongodb";

export const getSuggestions = async (collection: string, search?: string) => {
    const client = await clientPromise;
    const db = client.db()

    const filter: {label?: RegExp} = {}
    if (search !== undefined) {
        filter.label = new RegExp(search)
    }

    return await db.collection(collection)
        .find(filter)
        .limit(10)
        .project({_id: 1, label: 1})
        .toArray()
}