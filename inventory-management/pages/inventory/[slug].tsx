import { GetServerSideProps } from "next/types";
import clientPromise from "../../lib/mongodb";
import { ParsedUrlQuery } from "querystring";
import { getCollectionPage } from "../../lib/pagination";
import { useState } from "react";


type Params = ParsedUrlQuery & {
    slug: string
}

type InventoryProp = {
    data: any[],
    totalCount: number
}

const InventoryPage : React.FC<InventoryProp> = ({ data, totalCount }) => {
    return (
        
    )
}

export default InventoryPage

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const { slug } = params as Params

    try {
        const client = await clientPromise;
        const db = client.db()
        const results = await getCollectionPage(db, slug, 1)
        console.log(results)
        return {
            props: { ...results },
        }
    } catch (e) {
        console.error(e);
        return {
            props: { data: [] },
        };
    }
};