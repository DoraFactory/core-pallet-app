import React from 'react'
import { Icon, Table } from 'semantic-ui-react'
import '../styles/assets.css'
import '../styles/page-default.css'
import Icons from '../resources'
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
    "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

<br />;
const TableSingleLine = () => (
    <Table singleLine className="tb">
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>
                    <span className="origin">ORIGIN</span>
                </Table.HeaderCell>
                <Table.HeaderCell>
                    <span className="balance">BALANCE</span>
                </Table.HeaderCell>
                <Table.HeaderCell>
                    <span className="token">TOKEN SYMBOL</span>
                </Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            <Table.Row>
                <Table.Cell>
                    <div className="pd-body">
                        <img src={Icons.Dora} className="pic"></img>
                        <span className="lg-p">Dora-KSM Parachain</span>
                    </div>
                </Table.Cell>
                <Table.Cell>
                    <div clasName="ba-content">
                        <span className="ba-content1">123.4567</span>
                    </div>
                </Table.Cell>
                <Table.Cell>
                    <span>DORA</span>
                </Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>
                    <div className="pd-body">
                        <img src={Icons.Kusama} className="pic"></img>
                        <span className="lg-p">kusama</span>
                    </div>
                </Table.Cell>
                <Table.Cell>
                    <div clasName="ba-content">
                        <span className="ba-content1">0.324</span>
                    </div>
                </Table.Cell>
                <Table.Cell>
                    <span>KSM</span>
                </Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>
                    <div className="pd-body">
                        <img src={Icons.Litmus} className="pic"></img>
                        <span className="lg-p">Litmus</span>
                    </div>
                </Table.Cell>
                <Table.Cell>
                    <div clasName="ba-content">
                        <span className="ba-content1">1000000000</span>
                    </div>
                </Table.Cell>
                <Table.Cell>LIT</Table.Cell>
            </Table.Row>
        </Table.Body>
    </Table>
)

export default TableSingleLine