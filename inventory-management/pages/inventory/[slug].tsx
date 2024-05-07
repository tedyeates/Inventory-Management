import { GetServerSideProps } from "next/types"
import clientPromise from "../../lib/mongodb"
import { ParsedUrlQuery } from "querystring"
import { UpdateModal } from "../../lib/components/UpdateModal"
import { ObjectId } from "mongodb"
import { Entity } from "../../lib/types/collection-types"


type Params = ParsedUrlQuery & {
    slug: ObjectId
}

const InventoryPage : React.FC<Entity> = ({ _id, label, fields }) => {
    return (
        <UpdateModal 
            name={_id} 
            buttonMessage={`Update ${label}`} 
            fields={fields}
        />
    )
}

export default InventoryPage

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const { slug } = params as Params
    console.log(slug)
    try {
        const client = await clientPromise;
        const db = client.db()
        const fields = await db.collection('entity-fields').findOne({_id: slug})


        
        return {
            props: { ...fields },
        }
    } catch (e) {
        console.error(e);
        return {
            props: { data: [] },
        };
    }
};