import clientPromise from "../lib/mongodb"


export const setupTextSearch = async () => {
    const client = await clientPromise
    const db = client.db()
    const collections = await db.collection('entity-field').find({}).project({_id: 1}).toArray()

    for (let collection of collections) {
        await db.collection(collection.label).createIndex({label: "text"})
    }
}
