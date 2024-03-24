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

const InventoryTable : React.FC<InventoryProp> = ({ data, totalCount }) => {
    const [tableData, setTableData] = useState(data)

    if (!data) return (
        <main>No data available!</main>
    )

    const tableHeaders = data ?? Object.keys(data[0])

    const headers = () => tableHeaders.map(key => (
        <th key={key}>{key}</th>
    ));

    const rows = () => {
        return tableData.map(row => (
            <tr key={row._id}>
                {tableHeaders.map((key) => (
                    <td key={key}>{row[key]}</td>
                ))}
            </tr>
        ))
    }

    return (
        <table>
            <thead>
                {headers()}
            </thead>
            <tbody>
                {rows()}
            </tbody>
        </table>
    )
}

export default InventoryTable

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