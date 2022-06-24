import React, { useState, useEffect } from 'react'
import { Table } from 'semantic-ui-react'
import Icons from '../resources'
import { useSubstrateState } from '../context'
import { formatBalance } from '@polkadot/util'
import config from "../context/config"

const dora_ksm_parachain_explore = config.DORA_KSM_PARACHAIN_EXPLORE;
const ksm_network = config.KSM_NETWORK;
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
    "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);
<br />;

const TableSingleLine = () => {
    const { api, currentAccount } = useSubstrateState()
    const [accBalance, setaccBalance] = useState(0);
    const [ksmBalance, setKsmBalance] = useState(0);
    // Dora Ksm parachain equals Kusama: 12
    const chainDecimals = api.registry.chainDecimals[0];

    useEffect(() => {
        if (currentAccount) {
            let current_address = currentAccount.address;
            let unsubscribeAll = null
            api.query.system.account(current_address, balance_info => {
                const free = formatBalance(balance_info.data.free, { withSi: false, forceUnit: '-' }, chainDecimals);
                setaccBalance(free);
            })

            api.query.tokens.accounts(current_address, "KSM", balance_info => {
                const free = formatBalance(balance_info.free, { withSi: false, forceUnit: '-' }, chainDecimals);
                setKsmBalance(free);
            })
                .then(unsub => {
                    unsubscribeAll = unsub
                })
                .catch(console.error)
            return () => unsubscribeAll && unsubscribeAll()
        }
    }, [api, accBalance, currentAccount, setaccBalance])

    return (
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
                            <div className="icon-body2">
                                <a href={dora_ksm_parachain_explore} target="_blank" className="lg-p">Dora-KSM Parachain</a>
                                <img src={Icons.Arrow} className="icon-link2"></img>
                            </div>
                        </div>
                    </Table.Cell>
                    <Table.Cell>
                        <div clasName="ba-content">
                            <span className="ba-content1">{accBalance}</span>
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
                            <div>
                                <a href={ksm_network} target="_blank" className="lg-p">kusama</a>
                                <img src={Icons.Arrow} className="icon-link3"></img>
                            </div>
                        </div>
                    </Table.Cell>
                    <Table.Cell>
                        <div clasName="ba-content">
                            <span className="ba-content1">{ksmBalance}</span>
                        </div>
                    </Table.Cell>
                    <Table.Cell>
                        <span>KSM</span>
                    </Table.Cell>
                </Table.Row>
                {/* <Table.Row>
                        <Table.Cell>
                            <div className="pd-body">
                                <img src={Icons.Litmus} className="pic"></img>
                                <div>
                                    <span className="lg-p">Litmus</span>
                                    <img src={Icons.Arrow} className="icon-link4"></img>
                                </div>
                            </div>
                        </Table.Cell>
                        <Table.Cell>
                            <div clasName="ba-content">
                                <span className="ba-content1">0</span>
                            </div>
                        </Table.Cell>
                        <Table.Cell>LIT</Table.Cell>
                    </Table.Row> */}
            </Table.Body>
        </Table>
    );
}

export default TableSingleLine