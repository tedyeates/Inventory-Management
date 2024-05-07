import { Table } from '@mantine/core'

type Header = {
    label: string
    field: string
}

type StockTableProps = {
    headers: Header[]
    body: {
        [key: keyof Header.field]
    }[]
}

export const StockTable = ({ headers, body }: StockTableProps) => {
    return (
        <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
                {headers.map((header) => (
                    <Table.Th>{header.label}</Table.Th>
                ))}
            </Table.Thead>
            <Table.Tbody>
                {body.map((row, index) => (
                    <Table.Tr>
                        {headers.map((header) => (
                            <Table.Td>
                                {row[header.field]}
                            </Table.Td>
                        ))}
                    </Table.Tr>
                ))}
            </Table.Tbody>
        </Table>
    )
}