import React from 'react'
import { Table } from 'semantic-ui-react'
import '../styles/assets.css'
import '../styles/page-default.css'

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
    "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

<br />;
const TableSingleLine = () => (
    <Table singleLine className = "tb">
        <Table.Header>
            <Table.Row className = "tb-row">
                <Table.HeaderCell>ORIGIN</Table.HeaderCell>
                <Table.HeaderCell>BALANCE</Table.HeaderCell>
                <Table.HeaderCell>TOKEN SYMBOL</Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>
            <Table.Row>
                <Table.Cell>Dora-KSM Parachain</Table.Cell>
                <Table.Cell>123.4567</Table.Cell>
                <Table.Cell>DORA</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>Kusama</Table.Cell>
                <Table.Cell>0.324</Table.Cell>
                <Table.Cell>KSM</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>Litmus</Table.Cell>
                <Table.Cell>100000</Table.Cell>
                <Table.Cell>LIT</Table.Cell>
            </Table.Row>
        </Table.Body>
    </Table>
)

export default TableSingleLine